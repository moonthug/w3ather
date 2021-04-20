import React from 'react';

import { fetchCurrentWeatherData, WeatherData } from './fetchCurrentWeatherData';

interface WeatherState {
  loading: boolean;
  weather?: WeatherData;
}

export class CurrentWeather extends React.Component<any, WeatherState> {
  state: WeatherState  = {
    loading: true
  }

  async componentDidMount() {
    try {
      const weather = await fetchCurrentWeatherData();
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
