import type { ComponentStyleConfig } from "@chakra-ui/theme";
import type { ComponentDefaultProps } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";

const Button: ComponentStyleConfig = {
  baseStyle: () => ({
    fontWeight: "normal",
  }),
  variants: {
    navbar: (props: ComponentDefaultProps) => ({
      bg: "transparent",
      fontWeight: 500,
      fontSize: "13px",
      _hover: {
        color: mode("black", "white")(props),
      },
      color: mode("rgba(0,0,0,.6)", "rgba(255,255,255,.6)")(props),
    }),
    primary: () => ({
      bg: "rgb(117, 63, 229)",
      _hover: {
        bg: "rgb(142, 90, 250)",
        _disabled: {
          bg: "rgb(142, 90, 250)",
        },
      },
      color: "white",
    }),
    danger: () => ({
      bg: "rgb(229,62,62)",
      _hover: {
        bg: "red.400",
        _disabled: {
          bg: "red.400",
        },
      },
      color: "white",
    }),
  },
};

export default Button;
