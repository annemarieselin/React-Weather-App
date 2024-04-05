import React, { useState, useEffect } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);
  let [error, setError] = useState(null);

  useEffect(() => {
    console.log("Props Coordinates:", props.coordinates);

    setLoaded(false);

    if (
      props.coordinates &&
      props.coordinates.coordinates &&
      props.coordinates.coordinates.lat &&
      props.coordinates.coordinates.lon
    ) {
      let apiKey = "cb286bad3607984b41ed10c8de5cf00e";
      let longitude = props.coordinates.coordinates.lon;
      let latitude = props.coordinates.coordinates.lat;
      let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      axios
        .get(apiURL)
        .then((response) => {
          console.log("API Response:", response.data);
          handleResponse(response);
        })
        .catch((error) => {
          console.error("API Error:", error);
          setError("Error fetching data");
          setLoaded(true);
        });
    } else {
      setError("Coordinates are missing");
      setLoaded(true);
    }
  }, [props.coordinates]);

  function handleResponse(response) {
    if (response.data && response.data.daily) {
      setForecast(response.data.daily);
      setLoaded(true);
    } else {
      console.error("Invalid data received from the server:", response.data);
      setError("Invalid data received from the server");
      setLoaded(true);
    }
  }

  if (error) {
    return <div className="WeatherForecast">Error: {error}</div>;
  }

  if (!loaded) {
    return <div className="WeatherForecast">Loading...</div>;
  }

  return (
    <div className="WeatherForecast">
      <div className="row">
        {forecast.map(function (dailyForecast, index) {
          if (index < 5) {
            return (
              <div className="col" key={index}>
                <WeatherForecastDay data={dailyForecast} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
