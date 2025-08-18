import { router } from "../header";
import { coreRouter } from "./core";

export type AppRouter = typeof appRouter;

export const appRouter = router({
  core: coreRouter,
});
