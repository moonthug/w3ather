import React from 'react';

import { fetchDailyWeatherForecastData } from './fetchDailyWeatherForecastData';
import { DailyForecastData } from '@h0me/w3ather-dto';

interface DailyForecastState {
  loading: boolean;
  dailyForecasts?: DailyForecastData[];
}

export class DailyForecast extends React.Component<any, DailyForecastState> {
  state: DailyForecastState  = {
    loading: true
  }

  async componentDidMount() {
    try {
      const { dailyForecasts } = await fetchDailyWeatherForecastData();
      this.setState({
        loading: false,
        dailyForecasts
      });
    } catch (e) {
    }
  }

  render() {
    const { loading, dailyForecast } = this.state;

    return (
      <div>
        {loading && <p>Loading!</p> }
        { dailyForecast &&
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
