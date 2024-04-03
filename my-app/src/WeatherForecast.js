import React from "react";
import PropTypes from "prop-types";
import "./WeatherForecast.css";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecast({ weatherData }) {
  const { icon } = weatherData;

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

WeatherForecast.propTypes = {
  weatherData: PropTypes.shape({
    icon: PropTypes.string.isRequired,
  }).isRequired,
};
