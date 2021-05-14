import React from 'react';

import { CurrentWeather } from '../current-weather';
import { DailyForecasts } from '../daily-forecasts';

import './App.css';

export function App() {
  return (
    <div className="App">
      <CurrentWeather />
      <DailyForecasts />
    </div>
  );
}
