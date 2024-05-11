import { twMerge } from "tailwind-merge";
import classNames from "classnames";

const cn = (...inputs: classNames.ArgumentArray) => {
  return twMerge(classNames(inputs));
};

export default cn;
