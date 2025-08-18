import type { Context } from "./context";

import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    const zodErr =
      error.code === "BAD_REQUEST" &&
      error.cause instanceof ZodError &&
      error.cause.flatten();

    let zodErrMessage: string | null = null;

    if (
      zodErr &&
      zodErr.fieldErrors.elements &&
      zodErr.fieldErrors.elements.length > 0
    ) {
      zodErrMessage = zodErr.fieldErrors.elements[0];
    }

    if (zodErr && zodErr.formErrors && zodErr.formErrors.length > 0) {
      zodErrMessage = zodErr.formErrors[0];
    }

    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: zodErrMessage,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
