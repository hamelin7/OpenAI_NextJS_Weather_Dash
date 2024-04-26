const OpenAI = require("openai"); // Use require instead of import
const dotenv = require('dotenv'); // Import dotenv module
dotenv.config({path:'../.env'}); // Configure dotenv

// Access the environment variable from the .env file
const myAPIKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// Initialize OpenAI instance with the API key
const openai = new OpenAI({apiKey: myAPIKey, dangerouslyAllowBrowser: true}); // Pass API key as argument

// Function to send data to OpenAI API
const sendDataToOpenAI = async (data) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { "role": "user", "content": data.prompt }, // Assuming prompt is the user's message
        // Add other messages if needed
      ],
      model: data.model,
    });

    return completion.choices[0]; // Return the first choice from the completion
  } catch (error) {
    console.error('Error sending data to OpenAI API:', error);
    throw error;
  }
};

module.exports.sendDataToOpenAI = sendDataToOpenAI; // Export the function
