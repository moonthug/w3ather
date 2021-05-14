import React from 'react';

import { DailyForecastData } from '@h0me/w3ather-dto';

interface DailyForecastProps {
  dailyForecastData: DailyForecastData;
}

export const DailyForecast: React.FC<DailyForecastProps> = (props) => {
  return <div>
    <p>{props.dailyForecastData.recordedAt}</p>
  </div>
}
