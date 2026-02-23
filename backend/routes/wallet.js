const express = require("express");
const router = express.Router();

router.post("/save", async (req, res) => {
  const { accountNumber, routingNumber, nickname } = req.body;

  if (!accountNumber || !routingNumber || !nickname) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // simulate delay (2 sec)
  setTimeout(() => {
    const masked = "****" + accountNumber.slice(-4);

    res.status(200).json({
      nickname,
      maskedAccount: masked,
    });
  }, 2000); // 2 sec delay
});

module.exports = router;
