import { SensorReadingResponse } from '@h0me/w3ather-dto'

export async function fetchCurrentWeatherData(): Promise<SensorReadingResponse> {
  let data;
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_GATWEWAY}/weather/current`,
      {
        method: 'GET',
      });
    data = await response.json();
  } catch (e) {
    // Log
    throw e;
  }

  return data as SensorReadingResponse;
}
