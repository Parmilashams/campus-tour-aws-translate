import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate";
import dotenv from "dotenv";
import { supabase } from "../utils/supabaseClient.js";

dotenv.config();


 //AWS Translate client configuration

const translateClient = new TranslateClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Controller: Handle translation requests and save results to Supabase.
 *
 * Steps:
 *  1. Validate input (text, targetLang, point_id)
 *  2. Translate the text using AWS Translate
 *  3. Check if the point_id exists in 'roompoints'
 *  4. Insert the translated text into 'roompoint_translations'
 *  5. Return a clean JSON response
 */
export async function handleTranslate(req, res) {
  console.log(" Request received at /translate");

  try {
    const { text, targetLang, point_id } = req.body;
    console.log("Request body:", req.body);

    //  Step 1: Validate input
    if (!text || !targetLang || !point_id) {
      return res.status(400).json({
        error: "Missing required fields: text, targetLang, or point_id.",
      });
    }

    // Step 2: Translate text via AWS
    console.log(`Translating "${text}" → ${targetLang}`);
    const translateCommand = new TranslateTextCommand({
      Text: text,
      SourceLanguageCode: "auto",
      TargetLanguageCode: targetLang,
    });

    const awsResponse = await translateClient.send(translateCommand);
    const translatedText = awsResponse.TranslatedText;
    console.log("AWS Translation result:", translatedText);

    // Step 3: Check if point_id exists in 'roompoints'
    const { data: pointCheck, error: pointError } = await supabase
      .from("roompoints")
      .select("point_id")
      .eq("point_id", point_id)
      .maybeSingle();

    if (pointError) {
      console.error(" Supabase query error:", pointError.message);
    }

    if (!pointCheck) {
      console.warn("point_id not found in 'roompoints'. Skipping insert.");
      return res.status(404).json({
        translatedText,
        supabaseStatus: "Skipped — point_id not found in roompoints table.",
      });
    }

    //  Step 4: Insert translation record
    const { error: insertError } = await supabase
      .from("roompoint_translations")
      .insert([
        {
          point_id,
          language_code: targetLang,
          description: translatedText,
          audio_url: null, // for audio feature 
        },
      ]);

    if (insertError) {
      console.error(" Supabase insert error:", insertError.message);
      return res.status(500).json({
        translatedText,
        supabaseStatus: "Failed to save",
        details: insertError.message,
      });
    }

    // --- Step 5: Success response
    console.log(" Saved successfully to Supabase for point:", point_id);
    return res.status(200).json({
      translatedText,
      supabaseStatus: "Saved successfully",
    });

  } catch (error) {
    console.error(" Unexpected error:", error);
    return res.status(500).json({
      error: "Translation failed",
      details: error.message,
    });
  }
}
