import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function SearchInput() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  function displayWeather(response) {
    setWeatherData({
      city: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios
      .get(apiUrl)
      .then((response) => {
        displayWeather(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="search-box-row">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          className="search-box-input"
          onChange={updateCity}
        />
        <input type="submit" value="Search" />
      </form>
      {loading ? (
        <h4>Loading temperature for {city}...</h4>
      ) : (
        weatherData && (
          <div>
            <h4>The Weather in {city} is:</h4>
            <ul>
              <li>Temperature: {Math.round(weatherData.temperature)}°C</li>
              <li>Description: {weatherData.description}</li>
              <li>Humidity: {weatherData.humidity}%</li>
              <li>Wind: {weatherData.wind} km/h</li>
              <li>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                  alt={weatherData.description}
                />
              </li>
            </ul>
          </div>
        )
      )}
    </div>
  );
}
