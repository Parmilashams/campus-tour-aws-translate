/**
 * Supabase Client Configuration
 * Initializes and exports a reusable Supabase client instance.
 * 
 * what is here:
 *  - Loads environment variables from the `.env` file.
 *  - Connects to the Supabase project using the provided URL and API key.
 *  - Allows other modules (like controllers) to perform database operations.
 */


import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// Initialize Supabase client using environment variables
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
