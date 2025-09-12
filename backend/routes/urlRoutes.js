import express from "express";
import URL from "../models/URL.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Shorten URL
router.post("/shorten", async (req, res) => {
  let { url, alias } = req.body;
  if (!url) return res.status(400).json({ error: "Please provide a URL" });

  try {
    // auto prepend http:// if missing
    if (!/^https?:\/\//i.test(url)) {
      url = "http://" + url;
    }

    let shortCode = alias || uuidv4().slice(0, 6);

    // Check alias exists
    const existing = await URL.findOne({ where: { shortCode } });
    if (existing) return res.status(400).json({ error: "Alias already exists. Try another!" });

    const newUrl = await URL.create({ originalUrl: url, shortCode });
    res.json({
      message: "Short URL created successfully",
      shortUrl: `${process.env.BASE_URL || "http://localhost:5000"}/${shortCode}`,
      originalUrl: url,
      shortCode,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Redirect route (IMPORTANT)
router.get("/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const urlEntry = await URL.findOne({ where: { shortCode: code } });

    if (!urlEntry) {
      return res.status(404).json({ error: "URL not found" });
    }

    // Redirect user to original URL
    return res.redirect(urlEntry.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
