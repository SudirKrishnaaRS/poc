import fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { fastifyTRPCOpenApiPlugin } from 'trpc-openapi';
import { appRouter } from './router';
import { Context } from './trpc';

export async function buildApp() {
  // Initialize Fastify
  const app = fastify({ logger: true });

  // Enable CORS
  await app.register(cors);

  // --- 1. Setup Swagger Documentation ---
  // Swagger generates an interactive visual web page representing our API.
  // We feed it standard OpenAPI configurations (title, version, etc.)
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'ACH BFF API',
        description: 'Auto-generated OpenAPI docs from tRPC routers',
        version: '1.0.0',
      },
      servers: [{ url: 'http://localhost:3005' }],
    },
  });

  // This plugin serves the Swagger UI web page at the '/docs' route.
  await app.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
  });

  // --- 2. Mount standard REST API endpoints ---
  // Notice: here 'fastifyTRPCOpenApiPlugin' takes our tRPC routes
  // (appRouter) and automatically converts them into standard REST endpoints
  // using the .meta({}) information we provided in router.ts.
  await app.register(fastifyTRPCOpenApiPlugin, {
    basePath: '/api', // All REST endpoints will be prefixed with /api
    router: appRouter,
    createContext: ({ req, res }: { req: any; res: any }): Context => ({ req, res }),
  });

  // --- 3. Mount pure tRPC API endpoints ---
  // We also mount pure tRPC endpoints. If a frontend (like React or Next.js)
  // uses the tRPC client, it will call these routes directly to get end-to-end
  // type safety instead of manually calling REST. External standard clients can still use the '/api' routes above.
  await app.register(fastifyTRPCPlugin, {
    prefix: '/trpc', // All pure tRPC endpoints will be prefixed with /trpc
    trpcOptions: { 
      router: appRouter, 
      createContext: ({ req, res }: { req: any; res: any }): Context => ({ req, res }) 
    },
  });

  return app;
}
