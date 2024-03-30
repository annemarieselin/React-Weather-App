import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function SearchInput() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function displayWeather(response) {
    setWeatherData({
      city: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    });
    setError(null);
  }

  function displayForecast(response) {
    setForecastData(response.data.list);
  }

  function handleError(error) {
    setError("City not found. Please try again.");
    setLoading(false);
    setWeatherData(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    let apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
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
        handleError(error);
      });

    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
    axios
      .get(forecastUrl)
      .then((response) => {
        displayForecast(response);
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="weather-app">
      <header>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="🔎 Enter a city.."
            required
            name="city"
            className="search-input"
            onChange={updateCity}
          />
          <input type="submit" value="Search" className="search-button" />
        </form>
      </header>
      <main>
        <div className="weather-app-data">
          {loading ? (
            <h4>Loading temperature for {city}...</h4>
          ) : error ? (
            <h4>{error}</h4>
          ) : weatherData ? (
            <div>
              <h1 className="current-city">{weatherData.city}</h1>
              <p className="current-details">
                <strong>{weatherData.description}</strong>
                <br />
                <br />
                <strong>{new Date().toLocaleTimeString()}</strong>
                <br />
                Humidity: <strong>{weatherData.humidity}%</strong>
                <br />
                Wind: <strong>{weatherData.wind} km/h</strong>
              </p>
              <div className="current-temperature">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                  alt={weatherData.description}
                />
                <span className="current-temperature-value">
                  {Math.round(weatherData.temperature)}
                </span>
                <span className="current-temperature-unit">°C</span>
              </div>
            </div>
          ) : null}
        </div>
        <div className="weather-forecast">
          {forecastData.map((item, index) => (
            <div key={index}>
              <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
              <p>Temperature: {Math.round(item.main.temp)}°C</p>
              <p>Description: {item.weather[0].description}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="sources">
        This site was coded by Anne-Marie Selin at{" "}
        <a href="https://selinmarketing.com/" target="_blank" rel="noreferrer">
          Selin Marketing
        </a>{" "}
        and is open-source on{" "}
        <a
          href="https://github.com/annemarieselin/react-weather-app"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>{" "}
        and hosted on{" "}
        <a
          href="https://react-weather-app-annemarieselin.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          Netlify
        </a>
      </footer>
    </div>
  );
}
