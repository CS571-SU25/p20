import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain } from 'lucide-react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Your actual OpenWeatherMap API key
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    // Weather API Call
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${API_KEY}&units=imperial`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Weather API failed: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setWeather({
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed),
          description: data.weather[0].description,
          forecast: [
            { 
              day: "Today", 
              high: Math.round(data.main.temp_max), 
              low: Math.round(data.main.temp_min), 
              condition: data.weather[0].main 
            },
            { day: "Tomorrow", high: 78, low: 68, condition: "Sunny" },
            { day: "Wed", high: 73, low: 62, condition: "Rainy" }
          ]
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Weather API error:', error);
        // Fallback to mock data if API fails
        setWeather({
          temperature: 72,
          condition: "Partly Cloudy",
          humidity: 65,
          windSpeed: 8,
          description: "partly cloudy",
          forecast: [
            { day: "Today", high: 75, low: 65, condition: "Partly Cloudy" },
            { day: "Tomorrow", high: 78, low: 68, condition: "Sunny" },
            { day: "Wed", high: 73, low: 62, condition: "Rainy" }
          ]
        });
        setLoading(false);
      });

    // NYC Events API Call (No key needed!)
    fetch('https://data.cityofnewyork.us/resource/tvpp-9vvx.json?$limit=3')
      .then(response => response.json())
      .then(data => {
        setEvents(data.slice(0, 3));
      })
      .catch(error => {
        console.error('Events API error:', error);
        // Fallback events
        setEvents([
          { event_name: "Broadway Show", start_date_time: "8:00 PM" },
          { event_name: "Art Exhibition", start_date_time: "10:00 AM" },
          { event_name: "Central Park Concert", start_date_time: "6:00 PM" }
        ]);
      });
  }, []);

  if (loading) {
    return (
      <div className="card bg-primary text-white p-3 shadow">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-white" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <p className="text-center mt-3 mb-0">Loading NYC weather...</p>
      </div>
    );
  }

  const getWeatherIcon = (condition) => {
    const iconProps = { size: 32, role: "img" };
    
    switch(condition.toLowerCase()) {
      case 'clear':
      case 'sunny': 
        return <Sun {...iconProps} className="text-warning" aria-label="Sunny weather" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain {...iconProps} className="text-white" aria-label="Rainy weather" />;
      case 'clouds':
      case 'partly cloudy':
      case 'mist':
      case 'haze':
      default: 
        return <Cloud {...iconProps} className="text-white" aria-label="Cloudy weather" />;
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      {/* Weather Widget */}
      <div className="card bg-primary text-white shadow">
        <div className="card-body">
          <h1 className="card-title fw-bold h5 mb-3">NYC Weather Today</h1>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <div className="display-6 fw-bold">{weather.temperature}°F</div>
              <div className="text-white opacity-75 text-capitalize">{weather.description || weather.condition}</div>
            </div>
            <div className="text-end">
              {getWeatherIcon(weather.condition)}
              <div className="small text-white opacity-75 mt-2">
                Humidity: {weather.humidity}%<br />
                Wind: {weather.windSpeed} mph
              </div>
            </div>
          </div>
          <hr className="border-light opacity-50" />
          <h2 className="fw-semibold mb-2 h6">3-Day Forecast</h2>
          <div>
            {weather.forecast.map((day, index) => (
              <div key={index} className="d-flex justify-content-between small mb-1">
                <span>{day.day}</span>
                <span>{day.high}°/{day.low}°</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NYC Events Widget */}
      <div className="card bg-success text-white shadow">
        <div className="card-body">
          <h1 className="card-title fw-bold h5 mb-3">NYC Events Today</h1>
          <div>
            {events.length > 0 ? (
              events.map((event, index) => (
                <div key={index} className="d-flex justify-content-between small mb-2">
                  <span>
                    <span role="img" aria-label="Theater mask">🎭</span> {event.event_name || `NYC Event ${index + 1}`}
                  </span>
                  <span className="text-white opacity-75">
                    {event.start_date_time || 'All Day'}
                  </span>
                </div>
              ))
            ) : (
              <>
                <div className="d-flex justify-content-between small mb-2">
                  <span>
                    <span role="img" aria-label="Theater mask">🎭</span> Broadway Show
                  </span>
                  <span className="text-white opacity-75">8:00 PM</span>
                </div>
                <div className="d-flex justify-content-between small mb-2">
                  <span>
                    <span role="img" aria-label="Artist palette">🎨</span> Art Exhibition Opening
                  </span>
                  <span className="text-white opacity-75">10:00 AM</span>
                </div>
                <div className="d-flex justify-content-between small mb-2">
                  <span>
                    <span role="img" aria-label="Musical note">🎵</span> Central Park Concert
                  </span>
                  <span className="text-white opacity-75">6:00 PM</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;