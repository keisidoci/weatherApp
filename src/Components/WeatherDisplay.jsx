import React from "react";
import WeatherInfo from "./WeatherInfo";
import { useState, useEffect } from "react";
import "../Components/weatherDisplay.css";
import x from "../assets/fi-rr-cross.svg";
import Transition from "../Transition";
import sunny from "../assets/sunny.svg";
import windPic from "../assets/windPic.svg";
import humidityPic from "../assets/humidityPic.svg";
import rain from "../assets/rain.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import snow from "../assets/snow.png";
import axios from "axios";
const WeatherDisplay = () => {
  const [city, setCity] = useState("");
  const [temp, setTemperature] = useState();
  const [humidity, setHumidity] = useState();
  const [weatherCondition, setWeatherCondition] = useState();
  const [wind, setWind] = useState();
  const [imazhi, setImazhi] = useState(sunny);
  const [error, setError] = useState("");
  useEffect(() => {
    searchPressed();
  }, [city]);
  const api = {
    key: "e6df22f9fbd9ac23a946dba02f4c8f70",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const searchPressed = async () => {
    try {
      const response = await axios.get(
        `${api.base}weather?q=${city}&units=metric&APPID=${api.key}`
      );
      setTemperature(response.data.main.temp);
      setHumidity(response.data.main.humidity);
      setWeatherCondition(response.data.weather[0].main);
      setWind(response.data.wind.speed);
      console.log("Temperature:", response.data.main.temp); // Log temperature
      console.log("Humidity:", response.data.main.humidity); // Log humidity
      console.log("Weather Condition:", response.data.weather[0].main);
    } catch (error) {
      console.log("Error caught:", error);
      console.log("Response data:", error.response.data); // Log response data
      setError("City does not exist");
    }
  };

  useEffect(() => {
    console.log(error, "heyyyyyyyyyyyyyyyyyyyyyy");
  }, [error]);

  useEffect(() => {
    switch (weatherCondition) {
      case "Rain":
        setImazhi(rain);
        break;
      case "Clouds":
        setImazhi(cloud);
        break;
      case "Snow":
        setImazhi(snow);
        break;
      case "Drizzle":
        setImazhi(drizzle);
        break;
    }
  }, [weatherCondition]);

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
          {error === "" ? (
            <div className="weather-info">
              <img src={imazhi} alt="" className="weatherImage" />
              <div className="extra-info">
                <h1 className="temperature">{temp + "°C"}</h1>
                <p className="weatherCondition">{weatherCondition}</p>
                <p className="city">{city}</p>
                <div className="weatherExtraInfo">
                  {/* <Transition> */}
                  {/* </Transition> */}
                  <WeatherInfo
                    title={"Humidity"}
                    data={humidity + "%"}
                    img={humidityPic}
                  />
                  <WeatherInfo
                    title={"Wind speed"}
                    data={wind + "KM/h"}
                    img={windPic}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>{error}</div>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherDisplay;
