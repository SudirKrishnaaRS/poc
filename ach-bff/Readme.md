# ACH BFF

## What and Why?
- **Fastify**: A high-performance Node.js web framework (like Express, but significantly faster). It serves as the foundation of our API server.
- **tRPC**: A framework that lets us build end-to-end type-safe APIs. We define endpoints as TypeScript functions, and our frontend can call them with exact types and autocomplete without manual syncing or code generation.
- **OpenAPI**: While tRPC is great for our own frontends, external apps prefer standard HTTP REST APIs. Using `trpc-openapi`, we auto-generate standard REST endpoints + interactive Swagger documentation from our tRPC routes, giving us the best of both worlds.

## Tech Stack
- Fastify
- tRPC
- Fastify TRPC Plugin
- Fastify Swagger Plugin
- Fastify Swagger UI Plugin
- tRPC OpenAPI Plugin


## Local Setup
- Install dependencies
```bash
npm install
```

- Run the server
```bash
npm run dev
```

## Endpoints

- Swagger UI: http://localhost:3005/docs
- REST Endpoints: http://localhost:3005/api
- tRPC Endpoints: http://localhost:3005/trpc

___
<!-- Repo Setup Notes -->

## Dependencies

```bash
npm init -y
npm install fastify @trpc/server trpc-openapi zod @fastify/swagger @fastify/swagger-ui @fastify/cors
npm install --save-dev typescript tsx @types/node ts-node @types/fastify-cors
npx tsc --init
```
## Project Structure

```bash
ach-bff/
├── package.json
├── tsconfig.json          # Configured for standard Node ESM/CJS interop   
└── src/
    ├── trpc.ts            # Initialize tRPC configured with OpenApiMeta
    ├── router.ts          # Base routing implementation (currently has a basic /health query)
    ├── app.ts             # Fastify App initialization registering Swagger UI, REST and tRPC routes
    └── index.ts           # Server start script

```