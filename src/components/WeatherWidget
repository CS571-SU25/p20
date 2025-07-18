import { useEffect, useState } from 'react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      const resp = await fetch("https://api.openweathermap.org/data/2.5/weather?q=New York&appid=YOUR_API_KEY&units=imperial");
      const data = await resp.json();
      setWeather(data);
    }
    fetchWeather();
  }, []);

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div>
      <h1>NYC Weather</h1>
      <p>{weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp}°F</p>
    </div>
  );
}
