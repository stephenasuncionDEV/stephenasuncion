import { Endpoints } from "@octokit/types";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useCore } from "@/providers/CoreProvider";
import errorHandler from "@/helpers/errorHandler";

export type ContributionDay = {
  contributionCount: number;
  date: string;
};

export type ContributionDays = {
  contributionDays: Array<ContributionDay>;
};

export type ContributionWeek = Array<ContributionDay>;

export type Contributions = Array<ContributionWeek>;

export interface AboutProps {
  recentCommit: string;
  contributions: Contributions;
  totalContributions: number;
}

export type listUserRepoEventsResponse =
  Endpoints["GET /repos/{owner}/{repo}/events"]["response"];

export const useAbout = (): AboutProps => {
  const toast = useToast({
    title: "Error",
    status: "error",
    duration: 3000,
    isClosable: true,
  });
  const { octokit } = useCore();
  const [recentCommit, setRecentCommit] = useState<string>("");
  const [contributions, setContributions] = useState<Contributions>(
    [] as Contributions,
  );
  const [totalContributions, setTotalContributions] = useState<number>(0);

  /* eslint-disable  react-hooks/exhaustive-deps */
  useEffect(() => {
    getRecentCommit();
    getContributions();
  }, []);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const getRecentCommit = async () => {
    try {
      const res: any = await octokit.request(
        "GET /repos/{owner}/{repo}/events",
        {
          owner: "stephenasuncionDEV",
          repo: "stephenasuncionDEV.github.io",
        },
      );

      if (res.status !== 200) return;

      const events = res.data
        .filter(
          (event: any) =>
            event.type === "PushEvent" &&
            event.payload.ref === "refs/heads/main",
        )
        .map((pushEvent: any) => pushEvent.payload.commits);

      const { message } = events[events.length - 1][0];

      setRecentCommit(message);
    } catch (err: any) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };
  /* eslint-enable  @typescript-eslint/no-explicit-any */

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const getContributions = async () => {
    try {
      const res: any = await octokit.graphql(
        `query($owner:String!) { 
            user(login: $owner){
                contributionsCollection {
                    contributionCalendar {
                    totalContributions
                    weeks {
                            contributionDays {
                                contributionCount
                                date
                            }
                        }
                    }
                }
            }
        }`,
        {
          owner: "stephenasuncionDEV",
        },
      );

      const { totalContributions, weeks } =
        res.user.contributionsCollection.contributionCalendar;

      const newWeeks = weeks.map((week: ContributionDays) => {
        return week.contributionDays;
      });

      setTotalContributions(totalContributions);
      setContributions(newWeeks);
    } catch (err: any) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };
  /* eslint-enable  @typescript-eslint/no-explicit-any */

  return {
    recentCommit,
    contributions,
    totalContributions,
  };
};
