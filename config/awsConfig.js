/**
 * AWS Translate Client Configuration

 * This initializes and exports a reusable AWS Translate client.
 * 
 * Responsibilities:
 *  - Loads credentials and region from environment variables.
 *  - Provides a configured instance for use in controllers and routes.
 */


import { TranslateClient } from "@aws-sdk/client-translate";
import dotenv from "dotenv";
dotenv.config();
// Initialize AWS Translate client
const translateClient = new TranslateClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});
// Export the configured client
export default translateClient;
