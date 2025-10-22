
/**
 * Translation Routes
 * Defines API endpoints related to text translation.
 * 
 * Route:
 *  POST or translate – Receives text and target language,
 *  calls AWS Translate through the controller, and
 *  returns the translated result.
 */

import express from "express";
import { handleTranslate } from "../controllers/translateController.js";

const router = express.Router();

// POST /translate  handle text translation and DB save
router.post("/translate", handleTranslate);

export default router;
