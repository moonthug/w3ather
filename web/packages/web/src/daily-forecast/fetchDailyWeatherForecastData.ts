import { DailyForecastResponse } from '@h0me/w3ather-dto';
export type { DailyForecastData } from  '@h0me/w3ather-dto';

export async function fetchDailyWeatherForecastData(): Promise<DailyForecastResponse> {
  let data: DailyForecastResponse;
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_GATWEWAY}/weather/forecast/daily`,
      {
        method: 'GET',
      });
    data = await response.json();
  } catch (e) {
    // Log
    throw e;
  }

  return data;
}
