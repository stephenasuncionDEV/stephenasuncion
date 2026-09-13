import { trpc } from "@/common/trpc";

import { ArrowUpRight, Github } from "lucide-react";

const profileUrl = "https://github.com/stephenasuncionDEV";
const number = new Intl.NumberFormat("en-CA");
const monthName = new Intl.DateTimeFormat("en-CA", {
  month: "short",
  timeZone: "UTC",
});
const fullDate = new Intl.DateTimeFormat("en-CA", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default function GitHubStats() {
  const query = trpc.core.getGitHubStats.useQuery(undefined, {
    trpc: { context: { skipBatch: true } },
    staleTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const stats = query.data;
  const profile = stats?.profile;
  const calendar = stats?.calendar;
  const weeks = calendar?.weeks || [];
  const monthlyActivity = new Map<string, number>();

  weeks.forEach((week) => {
    week.days.forEach((day) => {
      const key = day.date.slice(0, 7);
      monthlyActivity.set(key, (monthlyActivity.get(key) || 0) + day.count);
    });
  });

  return (
    <section
      id="work"
      className="github-section page-shell section-space"
      aria-labelledby="work-title"
    >
      <div className="section-label mono">
        <span>A LITTLE EVERY DAY</span>
        <span>CODE, IN NUMBERS</span>
      </div>
      <div className="section-heading github-heading">
        <h2 id="work-title">
          On <em>GitHub.</em>
        </h2>
        <a
          className="text-link github-profile-link"
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={18} aria-hidden="true" />
          stephenasuncionDEV
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>

      {profile ? (
        <dl className="github-numbers">
          <div>
            <dt>Public repositories</dt>
            <dd>{number.format(profile.publicRepositories)}</dd>
          </div>
          <div>
            <dt>Stars on my repositories</dt>
            <dd>
              {profile.stars === null ? "—" : number.format(profile.stars)}
            </dd>
          </div>
          <div>
            <dt>Followers</dt>
            <dd>{number.format(profile.followers)}</dd>
          </div>
        </dl>
      ) : (
        <div className="github-empty" role="status">
          <span className="mono">
            {query.isLoading ? "CONNECTING TO GITHUB" : "A QUIET MOMENT"}
          </span>
          <p>
            {query.isLoading
              ? "Fetching the latest from my GitHub."
              : "My stats are taking a break. You can still explore my code on GitHub."}
          </p>
        </div>
      )}

      {calendar ? (
        <div className="github-activity">
          <div className="github-activity-heading">
            <p>
              <strong>{number.format(calendar.totalContributions)}</strong>
              <span>{calendar.scopeLabel}</span>
            </p>
            <span className="mono">ONE SQUARE, ONE DAY</span>
          </div>
          <div
            className="github-calendar-scroll"
            tabIndex={0}
            role="region"
            aria-label="GitHub contribution calendar. Scroll horizontally to explore the full year."
          >
            <svg
              className="github-calendar"
              viewBox={`0 0 ${weeks.length * 17 + 28} 150`}
              role="img"
              aria-labelledby="github-calendar-title github-calendar-description"
            >
              <title id="github-calendar-title">A year of contributions</title>
              <desc id="github-calendar-description">
                {number.format(calendar.totalContributions)} publicly visible
                contributions between {fullDate.format(new Date(calendar.from))}{" "}
                and {fullDate.format(new Date(calendar.to))}. Darker squares
                indicate more activity. Monthly totals are available below.
              </desc>
              {["Mon", "Wed", "Fri"].map((label, index) => (
                <text
                  key={label}
                  x="0"
                  y={46 + index * 34}
                  className="github-calendar-label"
                >
                  {label}
                </text>
              ))}
              {weeks.map((week, index) => {
                const date = new Date(week.firstDay);
                const previousMonth = index
                  ? new Date(weeks[index - 1].firstDay).getUTCMonth()
                  : -1;
                const showMonth =
                  date.getUTCMonth() !== previousMonth &&
                  index < weeks.length - 2;

                return (
                  <g
                    key={week.firstDay}
                    transform={`translate(${index * 17 + 28}, 0)`}
                  >
                    {showMonth && (
                      <text x="0" y="11" className="github-calendar-label">
                        {monthName.format(date)}
                      </text>
                    )}
                    {week.days.map((day) => (
                      <rect
                        key={day.date}
                        x="0"
                        y={day.weekday * 17 + 24}
                        width="13"
                        height="13"
                        rx="2"
                        className={`github-day github-day-${day.level}`}
                      >
                        <title>{`${number.format(day.count)} contributions on ${fullDate.format(new Date(day.date))}`}</title>
                      </rect>
                    ))}
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="github-calendar-footer">
            <span className="github-scroll-hint mono">
              SCROLL TO EXPLORE THE YEAR →
            </span>
            <div className="github-legend mono" aria-hidden="true">
              Less
              {[0, 1, 2, 3, 4].map((level) => (
                <i key={level} className={`github-day github-day-${level}`} />
              ))}
              More
            </div>
          </div>
        </div>
      ) : profile ? (
        <p className="github-calendar-unavailable">
          The contribution calendar is unavailable right now. The profile
          numbers above are from GitHub.
        </p>
      ) : null}

      <div className="github-bottom">
        {!!stats?.languages.length && (
          <div className="github-languages">
            <p className="mono">
              PRIMARY LANGUAGES ·{" "}
              {stats.languageScope === "accessible"
                ? "PUBLIC + PRIVATE REPOSITORIES"
                : "PUBLIC REPOSITORIES"}
            </p>
            <div className="github-language-bar" aria-hidden="true">
              {stats.languages.map((language, index) => (
                <span
                  key={language.name}
                  style={{
                    width: `${language.percentage}%`,
                    opacity: Math.max(0.2, 1 - index * 0.13),
                  }}
                />
              ))}
            </div>
            <ul>
              {stats.languages.map((language) => (
                <li key={language.name}>
                  <span>{language.name}</span>
                  <span>{language.percentage}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {!!monthlyActivity.size && (
          <details className="github-monthly">
            <summary>
              View activity by month <span aria-hidden="true">+</span>
            </summary>
            <table>
              <caption className="sr-only">
                Monthly totals from the displayed contribution calendar
              </caption>
              <thead>
                <tr>
                  <th scope="col">Month</th>
                  <th scope="col">Contributions</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(monthlyActivity)
                  .reverse()
                  .map(([month, count]) => (
                    <tr key={month}>
                      <th scope="row">
                        {monthName.format(new Date(`${month}-01`))}{" "}
                        {month.slice(0, 4)}
                      </th>
                      <td>{number.format(count)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </details>
        )}
      </div>
      {stats?.updatedAt && (
        <p className="github-source mono">
          FROM GITHUB · UPDATED{" "}
          {fullDate.format(new Date(stats.updatedAt)).toUpperCase()}
          {stats.stale ? " · SHOWING THE LAST AVAILABLE SNAPSHOT" : ""}
        </p>
      )}
    </section>
  );
}
