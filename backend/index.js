const express = require("express");
const PORT = 5000;
const cors = require("cors");
const walletRoute = require("./routes/wallet");

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/wallet", walletRoute);

app.listen(5000, () => console.log(`Server running on port ${PORT}`));
