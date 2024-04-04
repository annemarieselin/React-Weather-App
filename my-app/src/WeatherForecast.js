import React, { useEffect } from "react";
import "./WeatherForecast.css";
import WeatherIcon from "./WeatherIcon";
import Axios from "axios";

export default function WeatherForecast({ weatherData }) {
  let { icon } = weatherData ? weatherData : { icon: "" };

  let apiKey = "cb286bad3607984b41ed10c8de5cf00e";
  let longitude =
    weatherData && weatherData.coordinates ? weatherData.coordinates.lon : 0;
  let latitude =
    weatherData && weatherData.coordinates ? weatherData.coordinates.lat : 0;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(apiURL);
        handleResponse(response);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [apiURL]);

  function handleResponse(response) {
    console.log(response.data);
  }

  return (
    <div className="WeatherForecast">
      <div className="row">
        <div className="col">
          <div className="WeatherForecast-day">Thu</div>
          <div className="WeatherForecast-icon">
            <WeatherIcon code={icon} size={36} />
          </div>
          <div className="WeatherForecast-temperatures">
            <span className="WeatherForecast-temperature-max">19°</span>
            <span className="WeatherForecast-temperature-min">10°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
