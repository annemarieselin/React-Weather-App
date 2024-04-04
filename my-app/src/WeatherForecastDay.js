import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay({ data }) {
  return (
    <div className="WeatherForecast">
      <div className="row">
        <div className="col">
          <div className="WeatherForecast-day">{data.dt}</div>
          <div className="WeatherForecast-icon">
            <WeatherIcon code={data.weather[0].icon} size={36} />
          </div>
          <div className="WeatherForecast-temperatures">
            <span className="WeatherForecast-temperature-max">
              {data.temp.max}°
            </span>
            <span className="WeatherForecast-temperature-min">
              {data.temp.min}°
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
