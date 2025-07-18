import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain } from 'lucide-react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Your actual OpenWeatherMap API key
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
console.log("API Key:", API_KEY);



    
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
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-blue-300 rounded mb-4 w-32"></div>
          <div className="h-8 bg-blue-300 rounded mb-2 w-20"></div>
          <div className="h-4 bg-blue-300 rounded w-24"></div>
        </div>
        <p className="text-sm text-blue-200 mt-4">Loading NYC weather...</p>
      </div>
    );
  }

  const getWeatherIcon = (condition) => {
    switch(condition.toLowerCase()) {
      case 'clear':
      case 'sunny': 
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-8 h-8 text-blue-300" />;
      case 'clouds':
      case 'partly cloudy':
      case 'mist':
      case 'haze':
      default: 
        return <Cloud className="w-8 h-8 text-gray-300" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Weather Widget */}
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">NYC Weather Today</h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold">{weather.temperature}°F</div>
            <div className="text-blue-100 capitalize">{weather.description || weather.condition}</div>
          </div>
          <div className="text-right">
            {getWeatherIcon(weather.condition)}
            <div className="text-sm text-blue-100 mt-2">
              Humidity: {weather.humidity}%<br />
              Wind: {weather.windSpeed} mph
            </div>
          </div>
        </div>
        <div className="border-t border-blue-300 pt-4">
          <h4 className="text-sm font-semibold mb-2">3-Day Forecast</h4>
          <div className="space-y-1">
            {weather.forecast.map((day, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{day.day}</span>
                <span>{day.high}°/{day.low}°</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NYC Events Widget */}
      <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">NYC Events Today</h3>
        <div className="space-y-2">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="text-sm flex justify-between">
                <span>🎭 {event.event_name || `NYC Event ${index + 1}`}</span>
                <span className="text-green-100">
                  {event.start_date_time || 'All Day'}
                </span>
              </div>
            ))
          ) : (
            <>
              <div className="text-sm flex justify-between">
                <span>🎭 Broadway Show</span>
                <span className="text-green-100">8:00 PM</span>
              </div>
              <div className="text-sm flex justify-between">
                <span>🎨 Art Exhibition Opening</span>
                <span className="text-green-100">10:00 AM</span>
              </div>
              <div className="text-sm flex justify-between">
                <span>🎵 Central Park Concert</span>
                <span className="text-green-100">6:00 PM</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;