import { createDbClient, DbClient } from '@h0me/w3ather-db';

export async function connectToDb(client: DbClient, logger: any): Promise<DbClient> {
  if (client) return client;

  client = await createDbClient(process.env.MONGO_URL, logger, {
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0 // and MongoDB driver buffering
  });

  return client;
}
