import React, { useState } from "react";

export default function WeatherTemperature(props) {
  const [unit, setUnit] = useState("celsius");

  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function showCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  if (unit === "celsius") {
    return (
      <div className="WeatherTemperature">
        <p>
          <span className="current-temperature-value">
            {Math.round(props.celsius)}
          </span>
          <span className="unit">
            {" "}
            ºC |
            <a href="/" onClick={showFahrenheit}>
              ºF
            </a>{" "}
          </span>
        </p>
      </div>
    );
  } else {
    let fahrenheit = (props.celsius * 9) / 5 + 32;
    return (
      <div className="WeatherTemperature">
        <p>
          <span className="current-temperature-value">
            {Math.round(fahrenheit)}
          </span>
          <span className="unit">
            {" "}
            ºF |{" "}
            <a href="/" onClick={showCelsius}>
              ºC
            </a>{" "}
          </span>
        </p>
      </div>
    );
  }
}
