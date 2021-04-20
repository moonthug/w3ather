import { Logger } from 'pino';
import { hourlyForecastModel } from '@h0me/w3ather-db';
import { response } from '../helpers/response';

export async function getHourlyWeatherForecastHandler(logger: Logger) {
  const hourlyForecast = await hourlyForecastModel.find();
  return response({ hourlyForecast });
}
