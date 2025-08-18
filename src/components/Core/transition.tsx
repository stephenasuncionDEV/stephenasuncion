import type { HTMLMotionProps } from "framer-motion";

import { type ForwardedRef, forwardRef } from "react";

import { motion } from "framer-motion";

type SpringTransitionProps = Omit<HTMLMotionProps<"div">, "ref"> & {
  disabled?: boolean;
  vertical?: boolean;
  power?: number;
};

const SpringTransition = forwardRef<HTMLDivElement, SpringTransitionProps>(
  (
    { disabled, vertical, power = 100, ...props },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <motion.div
        ref={ref}
        data-slot="spring-transition"
        {...(!disabled && {
          initial: {
            ...(vertical ? { y: power } : { x: power }),
            opacity: 0,
          },
          animate: {
            ...(vertical ? { y: 0 } : { x: 0 }),
            opacity: 1,
          },
          exit: {
            ...(vertical ? { y: power } : { x: power }),
            opacity: 0,
          },
          transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.3,
          },
        })}
        {...props}
      />
    );
  },
);

SpringTransition.displayName = "SpringTransition";

export { SpringTransition };
