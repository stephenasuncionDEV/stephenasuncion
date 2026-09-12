const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const filename = resolve(__dirname, "../src/common/github.ts");
const source = ts.transpileModule(readFileSync(filename, "utf8"), {
  compilerOptions: {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
    esModuleInterop: true,
  },
}).outputText;

const calendar = Array.from({ length: 365 }, (_, index) => {
  const date = new Date(Date.UTC(2025, 0, index + 1))
    .toISOString()
    .slice(0, 10);
  return `<td data-level="1" id="day-${index}" data-date="${date}"></td><tool-tip for="day-${index}">1 contribution on January 1st.</tool-tip>`;
}).join("");

function response(value, ok = true) {
  return Promise.resolve({
    ok,
    text: async () =>
      typeof value === "string" ? value : JSON.stringify(value),
  });
}

function repository(stars, language, fork = false, isPrivate = false) {
  return {
    stargazerCount: stars,
    primaryLanguage: language ? { name: language } : null,
    isFork: fork,
    isPrivate,
    owner: { login: "stephenasuncionDEV" },
  };
}

function graph(
  nodes,
  hasNextPage = false,
  endCursor = null,
  totalCount = 3,
  publicTotalCount = totalCount,
) {
  return {
    data: {
      user: {
        createdAt: "2020-11-04T17:16:20Z",
        followers: { totalCount: 41 },
        publicRepositories: { totalCount: publicTotalCount },
        repositories: {
          totalCount,
          nodes,
          pageInfo: { hasNextPage, endCursor },
        },
      },
    },
  };
}

function service(route, token = "test-token") {
  const calls = [];
  let now = Date.now();
  const exported = {};
  const context = vm.createContext({
    exports: exported,
    module: { exports: exported },
    require,
    AbortController,
    setTimeout,
    clearTimeout,
    Date: class extends Date {
      static now() {
        return now;
      }
    },
    process: { env: token ? { GITHUB_PERSONAL_ACCESS_TOKEN: token } : {} },
    fetch: (url, init) => {
      calls.push({ url, init });
      return route(url, init);
    },
  });
  vm.runInContext(source, context, { filename });
  return {
    read: exported.getGitHubStats,
    calls,
    advance: (milliseconds) => {
      now += milliseconds;
    },
  };
}

function publicCalendar() {
  return response(`365 contributions in the last year${calendar}`);
}

test("paginates accessible repositories, isolates the token and deduplicates cached requests", async () => {
  const api = service((url, init) => {
    if (url.includes("/contributions")) return publicCalendar();
    const payload = JSON.parse(init.body);
    assert.match(
      payload.query,
      /publicRepositories: repositories\(privacy: PUBLIC/,
    );
    assert.match(
      payload.query,
      /repositories\(first: 100, after: \$after, ownerAffiliations/,
    );
    assert.match(payload.query, /ownerAffiliations: \[OWNER\]/);
    return response(
      payload.variables.after
        ? graph([repository(7, "JavaScript", true)])
        : graph(
            [repository(3, "TypeScript"), repository(5, "Rust")],
            true,
            "next",
          ),
    );
  });
  const [first, second] = await Promise.all([api.read(), api.read()]);
  assert.equal(first, second);
  assert.equal(first.status, "ready");
  assert.equal(first.profile.stars, 15);
  assert.equal(first.calendar.totalContributions, 365);
  assert.equal(first.calendar.weeks.flatMap((week) => week.days).length, 365);
  assert.equal(first.languages.length, 2);
  assert.equal(first.languageScope, "accessible");
  assert.equal(first.languages[0].percentage, 50);
  assert.equal(api.calls.length, 3);
  assert.equal(
    api.calls.find(({ url }) => url.includes("/contributions")).init.headers
      .Authorization,
    undefined,
  );
  assert.ok(
    api.calls
      .filter(({ url }) => url.includes("api.github.com"))
      .every(({ init }) => init.headers.Authorization === "Bearer test-token"),
  );
  assert.ok(!JSON.stringify(first).includes("test-token"));
  await api.read();
  assert.equal(api.calls.length, 3);
});

test("uses the public REST API when the token cannot query GraphQL", async () => {
  const api = service((url) => {
    if (url.includes("/contributions")) return publicCalendar();
    if (url.endsWith("/graphql")) return response({}, false);
    if (url.includes("/repos?")) {
      return response([
        {
          private: false,
          fork: false,
          owner: { login: "stephenasuncionDEV" },
          stargazers_count: 9,
          language: "TypeScript",
        },
      ]);
    }
    return response({
      created_at: "2020-11-04T17:16:20Z",
      public_repos: 1,
      followers: 41,
    });
  });
  const result = await api.read();
  assert.equal(result.status, "ready");
  assert.equal(result.profile.stars, 9);
  assert.equal(result.languages[0].name, "TypeScript");
});

test("does not publish a partial repository sum as total stars", async () => {
  let page = 0;
  const api = service((url) => {
    if (url.includes("/contributions")) return publicCalendar();
    page += 1;
    return response(
      graph([repository(10, "TypeScript")], true, `page-${page}`, 2001),
    );
  });
  const result = await api.read();
  assert.equal(result.status, "partial");
  assert.equal(result.profile.publicRepositories, 2001);
  assert.equal(result.profile.stars, null);
  assert.equal(result.languages.length, 0);
  assert.equal(page, 20);
});

test("includes private repositories in language totals without changing public stars", async () => {
  const api = service((url) => {
    if (url.includes("/contributions")) return publicCalendar();
    return response(
      graph(
        [
          repository(4, "TypeScript"),
          repository(99, "JavaScript", false, true),
        ],
        false,
        null,
        2,
        1,
      ),
    );
  });
  const result = await api.read();
  assert.equal(result.status, "ready");
  assert.equal(result.profile.publicRepositories, 1);
  assert.equal(result.profile.stars, 4);
  assert.equal(result.languages.length, 2);
  assert.equal(result.languages[0].percentage, 50);
  assert.equal(result.languageScope, "accessible");
});

test("hides a changed or incomplete calendar instead of fabricating activity", async () => {
  const api = service((url) => {
    if (url.includes("/contributions"))
      return response("365 contributions in the last year");
    return response(graph([repository(4, "TypeScript")], false, null, 1));
  });
  const result = await api.read();
  assert.equal(result.status, "partial");
  assert.equal(result.calendar, null);
  assert.equal(result.profile.stars, 4);
});

test("returns a truthful unavailable state without a token or API access", async () => {
  const api = service(() => response({}, false), null);
  const result = await api.read();
  assert.equal(result.status, "unavailable");
  assert.equal(result.profile, null);
  assert.equal(result.calendar, null);
  assert.equal(result.updatedAt, null);
  assert.ok(api.calls.every(({ init }) => !init.headers.Authorization));
});

test("retains timestamped stale data when a refresh fails", async () => {
  let available = true;
  const api = service((url) => {
    if (!available) return response({}, false);
    if (url.includes("/contributions")) return publicCalendar();
    return response(graph([repository(4, "TypeScript")], false, null, 1));
  });
  const initial = await api.read();
  available = false;
  api.advance(16 * 60 * 1000);
  const stale = await api.read();
  assert.equal(stale.stale, true);
  assert.equal(stale.updatedAt, initial.updatedAt);
  assert.equal(stale.profile.stars, initial.profile.stars);
});
