const express = require("express");
const cors = require("cors");
const walletRoute = require("./routes/wallet");

const app = express();
app.use(cors());
app.use(express.json());

// JSON error handling middleware
// app.use((err, req, res, next) => {

//   if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
//     return res.status(400).json({
//       error: "Invalid JSON format",
//       message:
//         "Please check your JSON syntax and ensure all property names are in double quotes",
//     });
//   }
//   next();
// });

const router = express.Router();

// router.get("/test", (req, res) => {
//   res.status(200).json({ message: "Wallet API is working" });
// });

app.use("/api/wallet", walletRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
