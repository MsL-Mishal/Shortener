import express from "express";
import { nanoid } from "nanoid";

import Url from "../models/Urls.js";

const router = express.Router();

router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const shortId = nanoid(7); // generate a 7-character ID

  try {
    const url = new Url({ originalUrl, shortId });
    await url.save();
    res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortId}` });
  } catch (error) {
    res.status(500).json({ error: "Error creating shortened URL" });
  }
});

router.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error redirecting to original URL" });
  }
});

export default router;
