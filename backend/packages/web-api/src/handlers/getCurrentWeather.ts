import { Logger } from 'pino';
import { sensorReadingModel } from '@h0me/w3ather-db';
import { response } from '../helpers/response';

export async function getCurrentWeatherHandler(logger: Logger) {
  const sensorReadings = await sensorReadingModel.find();
  return response({ sensorReadings });
}
