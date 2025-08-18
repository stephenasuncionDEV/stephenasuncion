import { router } from "../header";
import { publicProcedure } from "../header";

export const coreRouter = router({
  test: publicProcedure.query(async ({ ctx }) => {
    const test = await ctx.prisma.test.findFirst();

    return test;
  }),
});

export type CoreRouter = typeof coreRouter;
