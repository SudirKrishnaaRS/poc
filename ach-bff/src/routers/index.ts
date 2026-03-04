import { router } from '../trpc';
import { healthRouter } from './health';

// appRouter is the main router for our application. 
// In a production app, we merge all sub-routers (health, users, auth, etc.) here.
export const appRouter = router({
  health: healthRouter,
});

// We export the TypeScript type of our router.
// A frontend app can import just this Type to know EXACTLY
// what endpoints exist, what inputs they require, and what outputs they return,
// enabling full end-to-end type safety directly from the Backend to Frontend!
export type AppRouter = typeof appRouter;
