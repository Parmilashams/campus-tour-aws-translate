/**
 * Language Routes

 * This defines the Express routes for listing all supported
 * translation languages available through AWS Translate.
 * what it does:
 *  - Uses AWS SDK to fetch supported language codes and names.
 *  - Returns a clean JSON response to the frontend.
 *  - Handles AWS and server errors gracefully.
 */

import express from "express";
import { TranslateClient, ListLanguagesCommand } from "@aws-sdk/client-translate";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
// Initialize AWS Translate client
const translateClient = new TranslateClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  });

 /**
 * GET /languages
 * Fetches the list of supported translation languages.
 * Each language includes its ISO code and English display name.
 */
 router.get("/languages", async (req, res) => {
  try {
    const command = new ListLanguagesCommand({
      DisplayLanguageCode: "en", 
    });
    const result = await translateClient.send(command);
   // Simplify and format language data
    const languages = result.Languages.map((lang) => ({
      code: lang.LanguageCode,
      name: lang.LanguageName,
    }));

    res.json(languages);
  } catch (err) {
    console.error("ListLanguages Error:", err);
    res.status(500).json({ error: "Failed to list languages" });
  }
});

export default router;
