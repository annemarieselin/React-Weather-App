import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import FormattedDate from "./FormattedDate";

export default function SearchInput() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
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

  function handleError(error) {
    setError("City not found. Please try again.");
    setLoading(false);
    setWeatherData(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    let apiKey = "cb286bad3607984b41ed10c8de5cf00e";
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
        <div className="row">
          <div className="column">
            {loading ? (
              <h4>Loading temperature for {city}...</h4>
            ) : error ? (
              <h4>{error}</h4>
            ) : weatherData ? (
              <div>
                <h1 className="current-city">{weatherData.city}</h1>
                <div className="column">
                  {weatherData ? (
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
                  ) : null}
                  <strong>{weatherData.description}</strong>
                </div>

                <p className="current-details">
                  <br />
                  <br />
                  <FormattedDate />
                  Humidity: <strong>{weatherData.humidity}%</strong>
                  <br />
                  Wind: <strong>{weatherData.wind} km/h</strong>
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </main>
      <footer className="sources">
        This site was coded using JSX and React by Anne-Marie Selin at{" "}
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
          Netlify.
        </a>
      </footer>
    </div>
  );
}
