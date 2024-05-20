import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function LocationInput({ onCoordsChange }) {
  const [location, setLocation] = useState('');

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const apiKey = 'YOUR_OPENWEATHER_API_KEY';
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        onCoordsChange(lat, lon);
      }
    } catch (error) {
      console.error('Failed to fetch coordinates:', error);
    }
  };

  return (
    <div>
      <TextField
        label="Enter Address, City, or Zip Code"
        value={location}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleSearch} variant="contained" color="primary">
        Search
      </Button>
    </div>
  );
}

export default LocationInput;
