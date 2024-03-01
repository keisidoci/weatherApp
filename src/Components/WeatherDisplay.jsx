import React from "react";
import WeatherInfo from "./WeatherInfo";
import { useState, useEffect } from "react";
import "../Components/weatherDisplay.css";
import x from "../assets/fi-rr-cross.svg";
import Transition from "../Transition";
import sunny from "../assets/sunny.svg";
const WeatherDisplay = () => {
  const [city, setCity] = useState("");
  const [temp, setTemperature] = useState();
  const [humidity, setHumidity] = useState();
  const [weatherCondition, setWeatherCondition] = useState();
  const [wind, setWind] = useState();
  useEffect(() => {
    searchPressed();
  }, [city]);
  const api = {
    key: "e6df22f9fbd9ac23a946dba02f4c8f70",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  const [icon, setIcon] = useState("");
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTemperature(result.main.temp);
        setHumidity(result.main.humidity);
        setWeatherCondition(result.weather[0].main);
        setWind(result.wind.speed);
        console.log("Temperature:", result.main.temp); // Log temperature
        console.log("Humidity:", result.main.humidity); // Log humidity
        console.log("Weather Condition:", result.weather[0].main);
        setIcon(result.weather[0].icon);
      });
  };


  return (
    <div className="weather-container">
      <div className="weather-search">
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter city or location"
          className="weather-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setCity(e.target.value);
            }
          }}
        />
      </div>
      {city !== "" && (
        <>
          <div className="weather-info">
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" className="imazhi"/>
            <div className="extra-info">
              <h1>{temp}</h1>
              <p>{weatherCondition}</p>
              <p>{city}</p>
              <div>
                <Transition>
                  <WeatherInfo title={"Humidity"} data={humidity + "%"} />
                  <WeatherInfo title={"Wind speed"} data={wind + "KM/h"} />
                </Transition>
              </div>
            </div>
          </div>
          <p>Show more -{">"}</p>
        </>
      )}
    </div>
  );
};

export default WeatherDisplay;
