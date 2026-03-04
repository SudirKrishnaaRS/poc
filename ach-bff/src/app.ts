import fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { fastifyTRPCOpenApiPlugin, generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from './routers';
import { createContext } from './context';

export async function buildApp() {
  // Initialize Fastify
  const app = fastify({ logger: true });

  // Enable CORS
  await app.register(cors);

  // Generate OpenAPI spec directly from our tRPC router definitions
  const openApiDocument = generateOpenApiDocument(appRouter, {
    title: 'ACH BFF API',
    description: 'Auto-generated OpenAPI docs from tRPC routers',
    version: '1.0.0',
    baseUrl: 'http://localhost:3005/api',
  });

  // --- 1. Setup Swagger Documentation ---
  // Swagger generates an interactive visual web page representing our API.
  // We feed it the statically generated OpenAPI document from above.
  await app.register(swagger, {
    mode: 'static',
    specification: {
      document: openApiDocument,
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
    createContext,
  });

  // --- 3. Mount pure tRPC API endpoints ---
  // We also mount pure tRPC endpoints. If a frontend (like React or Next.js)
  // uses the tRPC client, it will call these routes directly to get end-to-end
  // type safety instead of manually calling REST. External standard clients can still use the '/api' routes above.
  await app.register(fastifyTRPCPlugin, {
    prefix: '/trpc', // All pure tRPC endpoints will be prefixed with /trpc
    trpcOptions: { 
      router: appRouter, 
      createContext,
    },
  });

  return app;
}
