import { buildApp } from './app';

const start = async () => {
  try {
    // We build the Fastify app configuration from 'app.ts'
    const app = await buildApp();
    
    // Start the server and listen on port 3005.
    // host: '0.0.0.0' is important so the server answers requests arriving from outside (like Docker containers).
    await app.listen({ port: 3005, host: '0.0.0.0' });
    
    // Print out the accessible URLs to the console for developers.
    app.log.info(`Server listening on http://localhost:3005`);
    app.log.info(`Swagger UI available at http://localhost:3005/docs`);
    app.log.info(`REST Endpoints available at http://localhost:3005/api`);
    app.log.info(`tRPC Endpoints available at http://localhost:3005/trpc`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Execute the async start function to boot the application up
start();
