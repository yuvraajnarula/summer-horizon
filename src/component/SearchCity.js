// src/components/SearchCity.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchCity = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '3cf3de9da4721c30f9301bdf1e5a6f10'; // Replace with your OpenWeatherMap API key

  const getWeather = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeather(null);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={getWeather}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img 
             src={`https://flagsapi.com/${weather.sys.country}/flat/64.png`}
             alt={`Flag of ${weather.sys.country}`}
          />
        </div>
      )}
    </div>
  );
};

export default SearchCity;
