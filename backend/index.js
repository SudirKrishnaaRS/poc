require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
const walletRoute = require("./routes/wallet");

const PORT = 5000;
const app = express();

// ── Auth0 JWT validation middleware ──────────────────────────────────────────
// Rejects any request that does NOT carry a valid Bearer token signed by Auth0.
// The token must have:
//   • audience  → matches AUTH0_AUDIENCE  (https://wallet-app-api)
//   • issuer    → matches AUTH0_ISSUER_BASE_URL
//   • algorithm → RS256 (Auth0 default for API tokens)
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

app.use(cors());
app.use(express.json());

// Apply JWT check globally — ALL routes below are now protected
app.use(jwtCheck);

// ROUTES
app.use("/api/wallet", walletRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
