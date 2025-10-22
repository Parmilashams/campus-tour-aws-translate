

//  Entry point for the Campus Tour Translation API.
//  Initializes Express server, loads environment variables,
//  connects AWS and Supabase integrations, and exposes routes.

import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import translateRoutes from "./routes/translateRoutes.js";
import languageRoutes from "./routes/languageRoutes.js"; 

dotenv.config();


// Express App Initialization
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/", translateRoutes);
app.use("/", languageRoutes);


// Server Startup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
  console.log("AWS Region:", process.env.AWS_REGION || "Not configured");
  console.log(
    " Supabase URL:",
    process.env.SUPABASE_URL ? "Connected" : "Missing"
  );
  console.log("Campus Tour Translation API is running.");
});
