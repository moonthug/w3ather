import dotenv from 'dotenv';
dotenv.config();

import pino from 'pino';
import { createDbClient } from '@h0me/w3ather-db';

import { createApp } from './app';

async function main() {
  const logger = pino({ name: 'w3ather-sensor-api', timestamp: true, level: 'debug' });
  const app = createApp();

  await createDbClient(process.env.MONGO_URL, logger);

  app.listen(process.env.PORT, () => {
    logger.info('Server listening');
  });
}

main().catch(console.error);
