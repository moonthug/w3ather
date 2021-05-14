import React from 'react';

import { fetchDailyWeatherForecastData } from './fetchDailyWeatherForecastData';
import { DailyForecastData } from '@h0me/w3ather-dto';
import { DailyForecast } from './DailyForecast';

interface DailyForecastsState {
  loading: boolean;
  dailyForecasts?: DailyForecastData[];
}

export class DailyForecasts extends React.Component<any, DailyForecastsState> {
  state: DailyForecastsState  = {
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
    const { loading, dailyForecasts } = this.state;

    return (
      <div>
        {loading && <p>Loading!</p> }
        { dailyForecasts &&
          <div>
            { dailyForecasts.map((dailyForecastData, i) => {
              return <DailyForecast key={ i } dailyForecastData={ dailyForecastData }/>;
            }) }
          </div>
        }
      </div>
    );
  }
}
