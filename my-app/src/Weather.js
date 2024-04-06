import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import WeatherForecast from "./WeatherForecast";
import WeatherTemperature from "./WeatherTemperature";
import FormattedDate from "./FormattedDate";

export default function SearchInput(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [error, setError] = useState(null);

  function displayWeather(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      city: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    });
    setError(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchCity();
  }

  function searchCity() {
    let apiKey = "cb286bad3607984b41ed10c8de5cf00e";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios
      .get(apiUrl)
      .then((response) => {
        displayWeather(response);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError("City not found. Please try again.");
      });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    if (!error) {
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
                <div>
                  <h1 className="current-city">{weatherData.city}</h1>
                </div>
                <div className="current-temperature">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                    alt={weatherData.description}
                  />
                  <WeatherTemperature celsius={weatherData.temperature} />
                </div>
                <strong>{weatherData.description}</strong>
              </div>
              <div className="column">
                <p className="current-details">
                  <br />
                  <br />
                  <FormattedDate />
                  <br />
                  Humidity: <strong>{weatherData.humidity}%</strong>
                  <br />
                  Wind: <strong>{weatherData.wind} km/h</strong>
                </p>
              </div>
            </div>
            <WeatherForecast coordinates={weatherData} />
          </main>
          <footer className="sources">
            This site was coded using JSX and React by Anne-Marie Selin at{" "}
            <a
              href="https://selinmarketing.com/"
              target="_blank"
              rel="noreferrer"
            >
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
    } else {
      return <h4>{error}</h4>;
    }
  } else {
    searchCity();
    return <h4>Loading temperature for {city}...</h4>;
  }
}
