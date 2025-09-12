import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import urlRoutes from "./routes/urlRoutes.js";
import URL from "./models/URL.js"; // For redirect lookups

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes (for shorten/create)
app.use("/api", urlRoutes);

// Redirect route (short code handling)
app.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const urlEntry = await URL.findOne({ where: { shortCode: code } });

    if (!urlEntry) {
      return res.status(404).send("<h1>404 - Short URL not found</h1>");
    }

    // Redirect to the original URL
    return res.redirect(urlEntry.originalUrl);
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).send("Internal server error");
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
