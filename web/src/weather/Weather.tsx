import React from 'react';

import { fetchWeatherData, WeatherData } from './fetchWeatherData';

interface WeatherState {
  loading: boolean;
  weather?: WeatherData;
}

export class Weather extends React.Component<any, WeatherState> {
  state: WeatherState  = {
    loading: true
  }

  async componentDidMount() {
    try {
      const weather = await fetchWeatherData();
      this.setState({
        loading: false,
        weather
      });
    } catch (e) {
    }
  }

  render() {
    const { loading, weather } = this.state;

    return (
      <div>
        {loading && <p>Loading!</p> }
        { weather &&
          <div>
            <p>Temp: {weather.temperature}</p>
            <p>Min Temp: {weather.temperatureMin}</p>
            <p>Max Temp: {weather.temperatureMax}</p>
            <p>Feels Like: {weather.feelsLike}</p>
            <p>Pressure: {weather.pressure}</p>
            <p>Humidity: {weather.humidity}</p>
            <p>Visibility: {weather.visibility}</p>
          </div>
        }
      </div>
    );
  }
}
