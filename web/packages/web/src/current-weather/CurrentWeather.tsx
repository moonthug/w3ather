import React from 'react';

import { fetchCurrentWeatherData } from './fetchCurrentWeatherData';
import { SensorReadingResponse } from '@h0me/w3ather-dto';

interface WeatherState {
  loading: boolean;
  weather?: SensorReadingResponse;
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
          <div>Data loaded!</div>
        }
      </div>
    );
  }
}
