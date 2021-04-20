import { Logger } from 'pino';
import { minutelyForecastModel } from '@h0me/w3ather-db';
import { response } from '../helpers/response';

export async function getMinutelyWeatherForecastHandler(logger: Logger) {
  const minutelyForecast = await minutelyForecastModel.find();
  return response({ minutelyForecast });
}
