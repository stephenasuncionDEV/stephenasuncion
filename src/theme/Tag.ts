import type { ComponentStyleConfig } from "@chakra-ui/theme";
import type { ComponentDefaultProps } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";

const Button: ComponentStyleConfig = {
  variants: {
    purple: (props: ComponentDefaultProps) => {
      return {
        container: {
          bgColor: mode("#753FE5", "#1c092a")(props),
          border: mode(
            "1px solid rgba(117,63,229,.6)",
            "1px solid #361155",
          )(props),
          height: "22px",
          color: "white",
        },
      };
    },
  },
};

export default Button;
