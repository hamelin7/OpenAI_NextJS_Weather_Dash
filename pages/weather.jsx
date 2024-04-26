import React, { useState } from "react";
import Header from "../components/header.jsx";
import axios from "axios";
import styles from "../styles/weather.module.css";
import {sendDataToOpenAI} from "./openai.js";

export default function Weather() {
  const [zipCode, setZipCode] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [generatedText, setGeneratedText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch weather data from your local Express server
      const weatherResponse = await axios.post(
        "http://localhost:3001/getWeather",
        { zipCode }
      );

      // Extract specific weather information
      const { temp, humidity, description, pressure } = weatherResponse.data.data;

      // Set the weather data to be displayed
      setWeatherData({
        temp,
        humidity,
        description,
        pressure,
      });

 // Send weather data to OpenAI API
 const openAIResponse = await sendDataToOpenAI({
  prompt: `I got this data from openweathermap. In a fun casual way, Can you tell me if it's good to go hiking based on this data? The weather in ${zipCode} is ${description}. Temperature is ${temp} F and humidity is ${humidity}%.`,
  model: "gpt-3.5-turbo",
  // Add other parameters as needed
});

// Check if the response object and the message content exist
if (openAIResponse && openAIResponse.message && openAIResponse.message.content) {
  // Extract assistant's message from OpenAI response
  const assistantMessage = openAIResponse.message.content;

  // Set the assistant's message to be displayed
  setGeneratedText(assistantMessage);
} else {
  // Handle the case when the response format is unexpected or when message content is not available
  console.error("Unexpected response format from OpenAI API or message content not available.");
  // Optionally, set a fallback message
  setGeneratedText("Sorry, an unexpected error occurred.");
}
} catch (error) {
console.error("Error fetching data:", error);
// Error handling
}
};

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <label>
          Zip Code:
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      <br />
      <br />
      {generatedText && (
        <div className={styles.openai_response}>
          <h2>Is it good to hike?</h2>
          <p>{generatedText}</p>
        </div>
      )}
      <br />
      {weatherData && (
        <div className={styles.weatherContainer}>
          <div className={styles.dataBox}>
            <h2>Temperature</h2>
            <p>{weatherData.temp} F</p>
          </div>

          <div className={styles.dataBox}>
            <h2>Humidity</h2>
            <p>{weatherData.humidity} %</p>
          </div>

          <div className={styles.dataBox}>
            <h2>Description</h2>
            <p>{weatherData.description}</p>
          </div>

          <div className={styles.dataBox}>
            <h2>Pressure</h2>
            <p>{weatherData.pressure} hPa</p>
          </div>
        </div>
      )}

    </div>
  );
}