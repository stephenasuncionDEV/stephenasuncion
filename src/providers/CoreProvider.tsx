import { Props } from "@/interfaces/index";
import {
  useState,
  useContext,
  createContext,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import { Octokit } from "octokit";

const newOctokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

export interface ICoreContextProps {
  octokit: Octokit;
  setOctokit: Dispatch<SetStateAction<Octokit>>;
}

export const CoreContext = createContext<ICoreContextProps>(
  {} as ICoreContextProps,
);
export const useCore = () => useContext(CoreContext);

export const CoreProvider: FC<Props> = ({ children }) => {
  const [octokit, setOctokit] = useState(newOctokit);

  return (
    <CoreContext.Provider
      value={{
        octokit,
        setOctokit,
      }}
    >
      {children}
    </CoreContext.Provider>
  );
};
