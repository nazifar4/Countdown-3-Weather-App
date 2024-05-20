import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeatherData = async () => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    try {
      setError(null);
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=f0443949fa81dc668ef563bde697b041`);
      setWeatherData(response.data);
    } catch (error) {
      setError('Error fetching weather data');
      console.error('Error fetching weather data:', error);
    }
  };

  const handleLocationChange = (e) => setLocation(e.target.value);

  return (
    <div className="app">
      <input type="text" value={location} onChange={handleLocationChange} placeholder="Enter location" />
      <button onClick={getWeatherData}>Get Weather</button>
      
      {error && <p className="error">{error}</p>}
      {weatherData ? (
        <div className="weather-data">
          {weatherData.list.map((forecast, index) => (
            <div key={index} className="weather-card">
              <p>{new Date(forecast.dt * 1000).toLocaleString()}</p>
              <p>{forecast.main.temp}K</p>
              <p>{forecast.weather[0].description}</p>
              <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="weather icon" />
            </div>
          ))}
        </div>
      ) : (
        !error && <p>No weather data available</p>
      )}
    </div>
  );
};

export default App;
