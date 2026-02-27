// Import Auth0 server-side SDK client for Next.js
import { Auth0Client } from "@auth0/nextjs-auth0/server";

// Create one reusable Auth0 client instance for this app
export const auth0 = new Auth0Client({
  // These parameters are sent when login/token requests are made
  authorizationParameters: {
    // "audience" tells Auth0 which API this app wants an access token for
    audience: process.env.AUTH0_AUDIENCE,
  },
});
