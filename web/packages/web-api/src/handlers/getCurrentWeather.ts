import { Logger } from 'pino';
import { externalReadingModel, sensorReadingModel } from '@h0me/w3ather-db';
import {  } from '@h0me/w3ather-dto';
import { response } from '../helpers/response';

export async function getCurrentWeatherHandler(logger: Logger) {
  const sensorReadings = await sensorReadingModel.find()
    .sort({ recordedAt: -1 })
    .limit(5);

  const externalReadings = await externalReadingModel.find()
    .sort({ recordedAt: -1 })
    .limit(5);

  return response({ externalReadings, sensorReadings });
}
