// Import required modules
const express = require("express");
const { OpenAI } = require("openai");
require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Create an Express application
const app = express();
app.use(express.text()); // Middleware to parse text/plain request bodies

// CORS configuration for cross-origin requests
const corsOptions = {
  origin: "https://app.tana.inc",
};
app.use(cors(corsOptions)); // Enable CORS with specified options

// Middleware for logging request details
app.use((req, res, next) => {
  console.log("Incoming Request:", req.method, req.path);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// Set the port for the server
const PORT = process.env.PORT || 3000;

// Define a POST endpoint to process image descriptions
app.post("/describe-image", async (req, res) => {
  try {
    const imageUrl = extractImageUrl(req.body);
    if (!imageUrl) {
      // Send an error response if no valid URL is found and exit the function
      return res.status(400).send("Invalid image URL");
    }

    // Get the image description from OpenAI
    const description = await getImageDescription(imageUrl);
    console.log("Description to be sent:", description);

    // Send the description as a response
    res.json({ description });
  } catch (error) {
    // Log the error
    console.error("Error:", error);

    // Check if the headers are already sent to the client
    if (!res.headersSent) {
      // Send an error response if headers haven't been sent yet
      res.status(500).send("Internal Server Error");
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Function to extract image URL from Markdown text
function extractImageUrl(markdownText) {
  // Regular expression to find Markdown image syntax
  const markdownUrlRegex = /!\[.*?\]\((.*?)\)/;
  const matches = markdownUrlRegex.exec(markdownText);
  // Return the extracted URL, or null if no match is found
  return matches ? matches[1] : null;
}

// Async function to get image description from OpenAI
async function getImageDescription(imageUrl) {
  try {
    // Call to OpenAI API with the image URL
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Return a comprehensive description of what's in the image.",
            },
            { type: "image_url", image_url: imageUrl },
          ],
        },
      ],
      max_tokens: 4096,
    });
    // Return the API response
    return response.choices[0];
  } catch (error) {
    // Log and rethrow error if API call fails
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to get image description from OpenAI API");
  }
}
