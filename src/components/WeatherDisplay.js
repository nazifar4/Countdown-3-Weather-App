import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const WeatherDisplay = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!lat || !lon) return; // Ensure latitude and longitude are provided
      try {
        const apiKey = 'YOUR_API_KEY'; // Replace YOUR_API_KEY with your actual API key
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${apiKey}`;
        const response = await axios.get(url);
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  if (loading) return <p>Loading...</p>;
  if (!weatherData) return <p>No weather data available.</p>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5">Current Weather</Typography>
            <Typography>{`Temperature: ${weatherData.current.temp}°C`}</Typography>
            <Typography>{`Description: ${weatherData.current.weather[0].description}`}</Typography>
            <img src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`} alt="Weather icon"/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Hourly Forecast (Next 24 hours)</Typography>
        <Grid container spacing={2}>
          {weatherData.hourly.slice(0, 24).map((hour, index) => (
            <Grid item xs={2} key={index}>
              <Card>
                <CardContent>
                  <Typography>{new Date(hour.dt * 1000).getHours() + ":00"}</Typography>
                  <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="Weather icon"/>
                  <Typography>{`${hour.temp}°C`}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Daily Forecast (Next 7 days)</Typography>
        <Grid container spacing={2}>
          {weatherData.daily.slice(0, 7).map((day, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography>{new Date(day.dt * 1000).toDateString()}</Typography>
                  <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="Weather icon"/>
                  <Typography>{`Temp: ${day.temp.day}°C`}</Typography>
                  <Typography>{`Min: ${day.temp.min}°C, Max: ${day.temp.max}°C`}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WeatherDisplay;
