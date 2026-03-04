import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';
import { Context } from './context';

// Initialize tRPC. This is the core engine of our API.
// We configure it to use our Context type, and we also give it 'OpenApiMeta'.
// 'OpenApiMeta' allows us to add extra metadata (like HTTP methods and REST paths)
// to our routes, so they can concurrently be exposed as standard REST endpoints using OpenAPI.
export const t = initTRPC
  .context<Context>()
  .meta<OpenApiMeta>()
  .create();

// We export 'router' and 'procedure' to be used in our route definitions.
// A 'router' groups related endpoints together.
export const router = t.router;

// A 'procedure' is a single endpoint (like a GET or POST request).
// 'publicProcedure' implies no authentication is required to access this endpoint.
export const publicProcedure = t.procedure;
