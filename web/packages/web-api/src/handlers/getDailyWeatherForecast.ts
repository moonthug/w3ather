import { Logger } from 'pino';
import { DailyForecastModel, dailyForecastModel } from '@h0me/w3ather-db';
import { DailyForecastResponse, DailyForecastData } from '@h0me/w3ather-dto';

import { response } from '../helpers/response';

function reduceDailyWeatherForecast(dailyForecast: DailyForecastModel): DailyForecastData {
  return {
    createdAt: dailyForecast.createdAt,
    updatedAt: dailyForecast.updatedAt,
    source: dailyForecast.source,
    recordedAt: dailyForecast.recordedAt,
    sunrise: dailyForecast.sunrise,
    sunset: dailyForecast.sunset,
    temp: dailyForecast.temp,
    feelsLike: dailyForecast.feelsLike,
    pressure: dailyForecast.pressure,
    humidity: dailyForecast.humidity,
    dewPoint: dailyForecast.dewPoint,
    uvIndex: dailyForecast.uvIndex,
    cloudiness: dailyForecast.cloudiness,
    visibility: dailyForecast.visibility,
    windSpeed: dailyForecast.windSpeed,
    windGust: dailyForecast.windGust,
    windDeg: dailyForecast.windDeg,
    probabilityOfPrecip: dailyForecast.probabilityOfPrecip,
    rainVolume: dailyForecast.rainVolume,
    snowVolume: dailyForecast.snowVolume,
    weather: dailyForecast.weather,
  }
}

export async function getDailyWeatherForecastHandler(logger: Logger) {
  const gtDate = new Date();
  gtDate.setHours(23, 59, 59);

  const dailyForecasts = await dailyForecastModel.find({
    recordedAt: {
      $gt: gtDate
    }
  });

  return response<DailyForecastResponse>({ dailyForecasts });
}
