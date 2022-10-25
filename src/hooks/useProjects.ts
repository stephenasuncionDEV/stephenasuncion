import { Endpoints } from "@octokit/types";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useCore } from "@/providers/CoreProvider";
import errorHandler from "@/helpers/errorHandler";

export type listUserReposResponse = Endpoints["GET /user/repos"]["response"];

export interface ProjectsProps {
  repositories: listUserReposResponse["data"];
}

export const allowedProjects = [
  "nfthost",
  "kaldereta",
  "gencomp",
  "emoji.io",
  "gen-rs",
  "swift-shop",
  "stephenasunciondev.github.io",
];

export const useProjects = (): ProjectsProps => {
  const toast = useToast({
    title: "Error",
    status: "error",
    duration: 3000,
    isClosable: true,
  });
  const { octokit } = useCore();
  const [repositories, setRepositories] = useState<
    listUserReposResponse["data"]
  >([] as listUserReposResponse["data"]);

  // Get Repositories
  /* eslint-disable  react-hooks/exhaustive-deps */
  useEffect(() => {
    if (repositories.length > 0) return;
    getRepositories();
  }, []);
  /* eslint-enable  react-hooks/exhaustive-deps */

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const getRepositories = async () => {
    try {
      const res = await octokit.request("GET /user/repos", {
        type: "public",
        sort: "updated",
      });

      const repos = res.data
        .filter(
          (repo) =>
            allowedProjects.includes(repo.name.toLocaleLowerCase()) &&
            repo.owner.login === "stephenasuncionDEV",
        )
        .sort(
          (a, b) =>
            allowedProjects.indexOf(a.name.toLowerCase()) -
            allowedProjects.indexOf(b.name.toLowerCase()),
        );

      setRepositories(repos);
    } catch (err: any) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };
  /* eslint-enable  @typescript-eslint/no-explicit-any */

  return {
    repositories,
  };
};
