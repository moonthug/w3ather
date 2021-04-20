import { Context, APIGatewayEvent } from 'aws-lambda';
import pino, { Logger } from 'pino';

import { DbClient } from '@h0me/w3ather-db';

import { connectToDb } from './helpers/connectToDb';
import { getCurrentWeatherHandler } from './handlers/getCurrentWeather';
import { getDailyWeatherForecastHandler } from './handlers/getDailyWeatherForecast';
import { getHourlyWeatherForecastHandler } from './handlers/getHourlyWeatherForecast';
import { getMinutelyWeatherForecastHandler } from './handlers/getMinutelyWeatherForecast';

let dbClient: DbClient;

async function setupDb(context: Context, logger: Logger) {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectToDb(dbClient, logger);
}

export async function getCurrentWeather(event: APIGatewayEvent, context: Context) {
  const logger = pino({ name: 'w3ather-web-api_getCurrentWeather', timestamp: true, level: 'debug' });

  await setupDb(context, logger);

  return getCurrentWeatherHandler(logger);
}

export async function getDailyWeatherForecast(event: APIGatewayEvent, context: Context) {
  const logger = pino({ name: 'w3ather-web-api_getDailyWeatherForecast', timestamp: true, level: 'debug' });

  await setupDb(context, logger);

  return getDailyWeatherForecastHandler(logger);
}

export async function getHourlyWeatherForecast(event: APIGatewayEvent, context: Context) {
  const logger = pino({ name: 'w3ather-web-getHourlyWeatherForecast', timestamp: true, level: 'debug' });

  await setupDb(context, logger);

  return getHourlyWeatherForecastHandler(logger);
}

export async function getMinutelyWeatherForecast(event: APIGatewayEvent, context: Context) {
  const logger = pino({ name: 'w3ather-web-getMinutelyWeatherForecast', timestamp: true, level: 'debug' });

  await setupDb(context, logger);

  return getMinutelyWeatherForecastHandler(logger);
}
