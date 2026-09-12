import { z } from "zod";

const LOGIN = "stephenasuncionDEV";
const PROFILE_URL = `https://github.com/${LOGIN}`;
const CACHE_DURATION = 15 * 60 * 1000;
const RETRY_DURATION = 60 * 1000;
const MAX_PAGES = 20;

export type GitHubStats = {
  status: "ready" | "partial" | "unavailable";
  profile: {
    login: string;
    url: string;
    joinedAt: string;
    publicRepositories: number;
    followers: number;
    stars: number | null;
  } | null;
  calendar: {
    totalContributions: number;
    from: string;
    to: string;
    scopeLabel: string;
    weeks: {
      firstDay: string;
      days: {
        date: string;
        count: number;
        level: 0 | 1 | 2 | 3 | 4;
        weekday: number;
      }[];
    }[];
  } | null;
  languages: { name: string; repositories: number; percentage: number }[];
  languageScope: "public" | "accessible";
  updatedAt: string | null;
  stale: boolean;
  source: "GitHub";
  sourceUrl: string;
};

type Repository = {
  stars: number;
  fork: boolean;
  private: boolean;
  language: string | null;
};
type ProfileResult = {
  profile: NonNullable<GitHubStats["profile"]>;
  languages: GitHubStats["languages"];
  languageScope: GitHubStats["languageScope"];
};

const countSchema = z.number().int().nonnegative();
const graphSchema = z.object({
  data: z.object({
    user: z.object({
      createdAt: z.string().datetime(),
      followers: z.object({ totalCount: countSchema }),
      publicRepositories: z.object({ totalCount: countSchema }),
      repositories: z.object({
        totalCount: countSchema,
        pageInfo: z.object({
          hasNextPage: z.boolean(),
          endCursor: z.string().nullable(),
        }),
        nodes: z.array(
          z.object({
            isPrivate: z.boolean(),
            isFork: z.boolean(),
            owner: z.object({ login: z.string() }),
            stargazerCount: countSchema,
            primaryLanguage: z.object({ name: z.string() }).nullable(),
          }),
        ),
      }),
    }),
  }),
});
const restProfileSchema = z.object({
  created_at: z.string().datetime(),
  public_repos: countSchema,
  followers: countSchema,
});
const restRepositoriesSchema = z.array(
  z.object({
    private: z.boolean(),
    fork: z.boolean(),
    owner: z.object({ login: z.string() }),
    stargazers_count: countSchema,
    language: z.string().nullable(),
  }),
);

const PROFILE_QUERY = `
  query PortfolioPublicProfile($login: String!, $after: String) {
    user(login: $login) {
      createdAt
      followers { totalCount }
      publicRepositories: repositories(privacy: PUBLIC, ownerAffiliations: [OWNER]) {
        totalCount
      }
      repositories(first: 100, after: $after, ownerAffiliations: [OWNER], orderBy: {field: NAME, direction: ASC}) {
        totalCount
        pageInfo { hasNextPage endCursor }
        nodes {
          isPrivate
          isFork
          owner { login }
          stargazerCount
          primaryLanguage { name }
        }
      }
    }
  }
`;

let cache: { value: GitHubStats; expiresAt: number } | null = null;
let pending: Promise<GitHubStats> | null = null;

function summarizeLanguages(repositories: Repository[]) {
  const counts = new Map<string, number>();
  for (const repository of repositories) {
    if (!repository.fork && repository.language) {
      counts.set(
        repository.language,
        (counts.get(repository.language) || 0) + 1,
      );
    }
  }
  const total = Array.from(counts.values()).reduce(
    (sum, count) => sum + count,
    0,
  );
  return Array.from(counts, ([name, repositories]) => ({
    name,
    repositories,
    percentage: Math.round((repositories / total) * 1000) / 10,
  })).sort(
    (a, b) => b.repositories - a.repositories || a.name.localeCompare(b.name),
  );
}

async function request(
  url: string,
  signal: AbortSignal,
  token?: string,
  body?: string,
) {
  const controller = new AbortController();
  const cancel = () => controller.abort();
  if (signal.aborted) cancel();
  signal.addEventListener("abort", cancel, { once: true });
  const timeout = setTimeout(cancel, 6000);
  try {
    const response = await fetch(url, {
      method: body ? "POST" : "GET",
      cache: "no-store",
      signal: controller.signal,
      headers: {
        "User-Agent": "stephen-asuncion-portfolio",
        Accept: url.startsWith("https://api.github.com/")
          ? "application/vnd.github+json"
          : "text/html",
        ...(token && url.startsWith("https://api.github.com/")
          ? { Authorization: `Bearer ${token}` }
          : {}),
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      ...(body ? { body } : {}),
    });
    if (!response.ok) throw new Error("GitHub is unavailable");
    return await response.text();
  } finally {
    clearTimeout(timeout);
    signal.removeEventListener("abort", cancel);
  }
}

async function readGraphProfile(
  token: string,
  signal: AbortSignal,
): Promise<ProfileResult> {
  const repositories: Repository[] = [];
  let after: string | null = null;
  let profile: ProfileResult["profile"] | null = null;
  let complete = false;

  for (let page = 0; page < MAX_PAGES; page += 1) {
    const raw = await request(
      "https://api.github.com/graphql",
      signal,
      token,
      JSON.stringify({
        query: PROFILE_QUERY,
        variables: { login: LOGIN, after },
      }),
    );
    const { user } = graphSchema.parse(JSON.parse(raw)).data;
    profile = {
      login: LOGIN,
      url: PROFILE_URL,
      joinedAt: user.createdAt,
      publicRepositories: user.publicRepositories.totalCount,
      followers: user.followers.totalCount,
      stars: null,
    };
    for (const repository of user.repositories.nodes) {
      if (repository.owner.login.toLowerCase() !== LOGIN.toLowerCase()) {
        throw new Error("GitHub returned an unexpected repository");
      }
      repositories.push({
        stars: repository.stargazerCount,
        fork: repository.isFork,
        private: repository.isPrivate,
        language: repository.primaryLanguage?.name || null,
      });
    }
    if (!user.repositories.pageInfo.hasNextPage) {
      complete = true;
      break;
    }
    const nextCursor = user.repositories.pageInfo.endCursor;
    if (!nextCursor || nextCursor === after) break;
    after = nextCursor;
  }

  if (!profile) throw new Error("GitHub profile is unavailable");
  return {
    profile: {
      ...profile,
      stars: complete
        ? repositories.reduce(
            (sum, repository) =>
              sum + (repository.private ? 0 : repository.stars),
            0,
          )
        : null,
    },
    languages: complete ? summarizeLanguages(repositories) : [],
    languageScope: "accessible",
  };
}

async function readRestProfile(
  signal: AbortSignal,
  token?: string,
): Promise<ProfileResult> {
  const raw = await request(
    `https://api.github.com/users/${LOGIN}`,
    signal,
    token,
  );
  const user = restProfileSchema.parse(JSON.parse(raw));
  const repositories: Repository[] = [];
  let complete = false;

  try {
    for (let page = 1; page <= MAX_PAGES; page += 1) {
      const raw = await request(
        token
          ? `https://api.github.com/user/repos?visibility=all&affiliation=owner&sort=full_name&direction=asc&per_page=100&page=${page}`
          : `https://api.github.com/users/${LOGIN}/repos?type=owner&sort=full_name&direction=asc&per_page=100&page=${page}`,
        signal,
        token,
      );
      const items = restRepositoriesSchema.parse(JSON.parse(raw));
      for (const repository of items) {
        if (repository.owner.login.toLowerCase() !== LOGIN.toLowerCase()) {
          throw new Error("GitHub returned an unexpected repository");
        }
        repositories.push({
          stars: repository.stargazers_count,
          fork: repository.fork,
          private: repository.private,
          language: repository.language,
        });
      }
      if (items.length < 100) {
        complete = true;
        break;
      }
    }
  } catch {
    complete = false;
  }

  return {
    profile: {
      login: LOGIN,
      url: PROFILE_URL,
      joinedAt: user.created_at,
      publicRepositories: user.public_repos,
      followers: user.followers,
      stars: complete
        ? repositories.reduce(
            (sum, repository) =>
              sum + (repository.private ? 0 : repository.stars),
            0,
          )
        : null,
    },
    languages: complete ? summarizeLanguages(repositories) : [],
    languageScope: token ? "accessible" : "public",
  };
}

async function readProfile(signal: AbortSignal): Promise<ProfileResult> {
  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN?.trim();
  if (token) {
    try {
      return await readGraphProfile(token, signal);
    } catch {
      try {
        return await readRestProfile(signal, token);
      } catch {
        return readRestProfile(signal);
      }
    }
  }
  return readRestProfile(signal);
}

function attributes(element: string) {
  return Object.fromEntries(
    Array.from(element.matchAll(/([\w-]+)=["']([^"']*)["']/g), (match) => [
      match[1],
      match[2],
    ]),
  );
}

async function readCalendar(signal: AbortSignal) {
  const html = await request(
    `https://github.com/users/${LOGIN}/contributions`,
    signal,
  );
  const summary = html.match(/([\d,]+)\s+contributions?\s+in the last year/i);
  if (!summary) throw new Error("GitHub contribution calendar is unavailable");
  const counts = new Map<string, number>();
  for (const match of Array.from(
    html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g),
  )) {
    const id = attributes(match[1]).for;
    const count = match[2].match(
      /^\s*(No|[\d,]+)\s+contributions?\s+on\b/i,
    )?.[1];
    if (id && count)
      counts.set(id, count === "No" ? 0 : Number(count.replaceAll(",", "")));
  }

  const days: NonNullable<GitHubStats["calendar"]>["weeks"][number]["days"] =
    [];
  for (const match of Array.from(
    html.matchAll(/<td\b[^>]*\bdata-date=[^>]*>/g),
  )) {
    const data = attributes(match[0]);
    const date = data["data-date"];
    const level = Number(data["data-level"]);
    const count = counts.get(data.id);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isInteger(level) ||
      level < 0 ||
      level > 4 ||
      count === undefined
    ) {
      throw new Error("GitHub contribution calendar changed format");
    }
    days.push({
      date,
      count,
      level: level as 0 | 1 | 2 | 3 | 4,
      weekday: new Date(`${date}T00:00:00Z`).getUTCDay(),
    });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  if (days.length < 350 || days.length > 378) {
    throw new Error("GitHub contribution calendar is incomplete");
  }

  const weeks: NonNullable<GitHubStats["calendar"]>["weeks"] = [];
  for (const day of days) {
    if (day.weekday === 0 || weeks.length === 0) {
      weeks.push({ firstDay: day.date, days: [] });
    }
    weeks[weeks.length - 1].days.push(day);
  }
  return {
    totalContributions: Number(summary[1].replaceAll(",", "")),
    from: days[0].date,
    to: days[days.length - 1].date,
    scopeLabel: "contributions in the last year",
    weeks,
  };
}

async function readStats(): Promise<GitHubStats> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18000);
  try {
    const [profileResult, calendarResult] = await Promise.allSettled([
      readProfile(controller.signal),
      readCalendar(controller.signal),
    ]);
    const profile =
      profileResult.status === "fulfilled" ? profileResult.value : null;
    const calendar =
      calendarResult.status === "fulfilled" ? calendarResult.value : null;
    return {
      status:
        profile && calendar && profile.profile.stars !== null
          ? "ready"
          : profile || calendar
            ? "partial"
            : "unavailable",
      profile: profile?.profile || null,
      calendar,
      languages: profile?.languages || [],
      languageScope: profile?.languageScope || "public",
      updatedAt: profile || calendar ? new Date().toISOString() : null,
      stale: false,
      source: "GitHub",
      sourceUrl: PROFILE_URL,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function getGitHubStats(): Promise<GitHubStats> {
  if (cache && cache.expiresAt > Date.now()) return cache.value;
  if (!pending) {
    pending = readStats()
      .then((value) => {
        if (value.status === "unavailable" && cache?.value.updatedAt) {
          value = { ...cache.value, stale: true };
        }
        cache = {
          value,
          expiresAt:
            Date.now() +
            (value.status === "ready" && !value.stale
              ? CACHE_DURATION
              : RETRY_DURATION),
        };
        return value;
      })
      .finally(() => {
        pending = null;
      });
  }
  return pending;
}
