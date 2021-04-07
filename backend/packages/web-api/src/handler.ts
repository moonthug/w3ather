import { Context, APIGatewayEvent } from 'aws-lambda';
import pino from 'pino';

import { DbClient, sensorReadingModel } from '@h0me/w3ather-db';

import { response } from './helpers/response';
import { connectToDb } from './helpers/connectToDb';

let dbClient: DbClient;

export async function getCurrentWeather(event: APIGatewayEvent, context: Context) {
  context.callbackWaitsForEmptyEventLoop = false;

  const logger = pino({ name: 'w3ather-web-api', timestamp: true, level: 'debug' });

  await connectToDb(dbClient, logger);

  const sensorReadings = await sensorReadingModel.find();

  return response({ sensorReadings });
}
