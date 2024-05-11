import { router } from "../header";
import { createCallerFactory } from "../header";
import { exampleRouter } from "./example";

export type AppRouter = typeof appRouter;

export const appRouter = router({
  example: exampleRouter,
});

export const createCaller = createCallerFactory(appRouter);
