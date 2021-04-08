import { Queue } from 'bull';

import { OpenWeatherService } from '../service/openWeatherService';

export async function createExternalReading(pushExternalReadingQueue: Queue) {
  const weatherData = await OpenWeatherService.fetchCurrentAndForecastWeather();
  return pushExternalReadingQueue.add({ weatherData });
}
