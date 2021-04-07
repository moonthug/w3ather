import { connect, ConnectOptions, Mongoose } from 'mongoose';

interface LoggerLike {
  info: (message: any) => any;
  error: (message: any) => any;
}

export type DbClient = Mongoose;

export async function createDbClient(uri: string, logger: LoggerLike = console, connectOptions?: ConnectOptions): Promise<DbClient> {
  try {
    logger.info(`connect to ${uri}`);
    return connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true, ...connectOptions }
    );
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
