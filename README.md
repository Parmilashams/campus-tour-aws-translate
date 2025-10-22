# Campus Tour AWS Translate 

This API module handles **text translation** using **AWS Translate** and stores results in **Supabase** under the `roompoint_translations` table.  
It is part of the **Campus Tour Application** project.

---

##  AWS Configuration

Create an `.env` file in your project root .  
This file stores your AWS and Supabase credentials.

### Example `.env`
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-service-role-key

PORT=3000
```

---

## Dependencies

Install all required dependencies:
```
npm install express cors body-parser dotenv @aws-sdk/client-translate @supabase/supabase-js
```

---

##  Running the Server

Start the API:
```
node server.js
```

### Expected Output
```
Server running on port 3000
AWS Region: us-east-1
Supabase URL: Connected
Campus Tour Translation API is running.
```

---

## API Endpoints

### **POST /translate**

**Request Body**
```json
{
  "text": "Welcome to Campus Tour App",
  "targetLang": "fr",
  "point_id": "valid-roompoint-uuid"
}
```

**Example Response**
```json
{
  "translatedText": "Bienvenue sur l'application Campus Tour",
  "supabaseStatus": "Saved successfully"
}
```

---

## Tech Stack

| Layer | Technology |
|--------|-------------|
| Backend | Node.js + Express |
| Translation | AWS Translate |
| Database | Supabase (PostgreSQL) |
| Environment Management | dotenv |

---

## Notes

- Ensure your AWS IAM user has **TranslateFullAccess** permissions.  
- The provided `point_id` must exist in the `roompoints` table on Supabase.   


---
