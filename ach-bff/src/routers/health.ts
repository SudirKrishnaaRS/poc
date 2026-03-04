import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

// We isolate the health-related routes into their own module/router.
export const healthRouter = router({
  // We define a new trpc endpoint /healthCheck
  healthCheck: publicProcedure
    // The .meta() block is for OpenAPI. It tells the system how to expose this tRPC
    // endpoint simultaneously as a standard REST API.
    .meta({
      openapi: {
        method: 'GET', // standard HTTP method
        path: '/health', // standard REST URL path
        tags: ['Health'], // Category for our Swagger UI docs
        summary: 'Health check endpoint', // Description for our Swagger docs
      },
    })
    // .input() defines what data this endpoint accepts from the client.
    // 'z.void()' means this endpoint takes no input arguments.
    // Zod (the 'z' variable) is a library that strictly validates incoming data shapes.
    .input(z.void())
    // .output() defines the exact shape of the data returned by this endpoint.
    // It strictly enforces that we must return an object with a 'status' string.
    .output(z.object({ status: z.string() }))
    // .query() is used for fetching data (similar to a GET request).
    // For modifying data (like POST/PUT requests), we would use .mutation() instead.
    .query(() => {
      // The actual implementation of the endpoint
      return { status: 'ok' };
    }),
});
