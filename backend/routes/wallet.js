const express = require("express");
require("dotenv/config");
const axios = require("axios");
const router = express.Router();

router.post("/save", async (req, res) => {
  const { accountNumber, routingNumber, nickname, captchaToken } = req.body;

  // Validate fields
  if (!accountNumber || !routingNumber || !nickname) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // Validate captcha token presence
  //   if (!captchaToken) {
  //     return res.status(400).json({ error: "CAPTCHA token missing" });
  //   }

  //   try {
  //     // Verify CAPTCHA with Google
  //     const verifyURL = `https://www.google.com/recaptcha/api/siteverify`;
  //     const response = await axios.post(
  //       verifyURL,
  //       new URLSearchParams({
  //         secret: process.env.RECAPTCHA_SECRET_KEY,
  //         response: captchaToken,
  //       }),
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //       }
  //     );

  //     const { success, score } = response.data;

  //     if (!success) {
  //       return res.status(403).json({ error: "CAPTCHA verification failed" });
  //     }

  // (Optional for reCAPTCHA v3)
  // if (score < 0.5) reject

  // Continue with wallet save logic
  setTimeout(() => {
    const masked = "****" + accountNumber.slice(-4);

    res.status(200).json({
      nickname,
      maskedAccount: masked,
    });
  }, 2000);
  //   } catch (error) {
  //     console.error("Captcha verification error:", error);
  //     res.status(500).json({ error: "CAPTCHA verification error" });
  //   }
});

module.exports = router;
