import { FastifyRequest, FastifyReply } from 'fastify';

// Context is used to share data (like request headers, user sessions, database connections)
// across all our tRPC routes.
// In a production app, you might also inject your database client or authenticated user info here.
export type Context = {
  req: FastifyRequest;
  res: FastifyReply;
};

// A helper function to create the context for each request
export function createContext({ req, res }: { req: FastifyRequest; res: FastifyReply }): Context {
  return { req, res };
}
