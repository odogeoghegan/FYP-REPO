import { createTRPCRouter } from "./trpc";
import { postRouter } from "./routers/post";
import { followsRouter } from "./routers/follows";
import { exampleRouter } from "./routers/example";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  follows :followsRouter,
  example : exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
