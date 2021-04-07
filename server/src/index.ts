import dotenv from 'dotenv';
dotenv.config();

import pino from 'pino';

import { createApp } from './app';
import { connectToDb } from './helpers/connectToDb';

async function main() {
  const logger = pino({ name: 'w3ather-sensor-server', timestamp: true, level: 'debug' });
  const app = createApp();

  await connectToDb(process.env.MONGO_URL);

  app.listen(process.env.PORT, () => {
    logger.info('Server listening');
  });
}

main().catch(console.error);
