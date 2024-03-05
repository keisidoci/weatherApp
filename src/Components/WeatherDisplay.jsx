import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import "../Components/weatherDisplay.css";
import sunny from "../assets/sunny.svg";
import windPic from "../assets/windPic.svg";
import humidityPic from "../assets/humidityPic.svg";
import rain from "../assets/rain.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import snow from "../assets/snow.png";

const WeatherDisplay = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("")
  const [temp, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [wind, setWind] = useState(null);
  const [weatherImage, setWeatherImage] = useState(sunny);
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
      const { main, weather, wind: { speed } } = response.data;
      setTemperature(main.temp);
      setHumidity(main.humidity);
      setWeatherCondition(weather[0].main);
      setWind(speed);
      setWeatherImage(getWeatherImage(weather[0].main));
      setCountry(main.sys.country)
      setError("");
    } catch (error) {
      console.log("Error caught:", error);
      setError("City does not exist");
      // Reset other state values to avoid displaying stale data
      setTemperature(null);
      setHumidity(null);
      setWeatherCondition(null);
      setWind(null);
      setWeatherImage(sunny);
    }
  };

  const getWeatherImage = (condition) => {
    switch (condition) {
      case "Rain":
        return rain;
      case "Clouds":
        return cloud;
      case "Snow":
        return snow;
      case "Drizzle":
        return drizzle;
      default:
        return sunny;
    }
  };

  const getWeatherGradient = (condition) => {
    switch (condition) {
      case "Rain":
        return {
          background: "var(--rainyGradient)",
        };
      case "Clouds":
        return {
          background: "var(--cloudyGradient)",
        };
      case "Snow":
        return {
          background: "var(--snowyGradient)",
        };
      case "Drizzle":
        return {
          background: "var(--sunnyGradient)", // Change this to the appropriate gradient
        };
      default:
        return {
          background: "var(--sunnyGradient)",
        };
    }
  };

  return (
    <div className="weather-container" style={getWeatherGradient(weatherCondition)}>
      <div className="weather-search">
        <input
          type="text"
          placeholder="Enter city or location"
          className="weather-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setCity(e.target.value);
            }
          }}
        />
      </div>
      {city && (
        <div className="weather-info">
          {error ? (
            <div>{error}</div>
          ) : (
            <>
              <img src={weatherImage} alt="" className="weatherImage" />
              <div className="extra-info">
                <h1 className="temperature">{Math.round(temp)}°C</h1>
                <p className="weatherCondition">{weatherCondition}</p>
                <p className="city">{city + country}</p>
                <div className="weatherExtraInfo">
                  <WeatherInfo
                    title={"Humidity"}
                    data={`${humidity}%`}
                    img={humidityPic}
                  />
                  <WeatherInfo
                    title={"Wind speed"}
                    data={`${wind} KM/h`}
                    img={windPic}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
