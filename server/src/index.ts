import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import { connectToDb } from './helpers/connectToDb';

async function main() {
  const app = createApp();

  await connectToDb(process.env.MONGO_URL);

  app.listen(3000);
}

main().catch(console.error);
