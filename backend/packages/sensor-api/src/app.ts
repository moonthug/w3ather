import Koa from 'koa';
import logger from 'koa-pino-logger';
import bodyParser from 'koa-bodyparser';
import { Queue } from 'bull';
import { StatusCodes } from 'http-status-codes';
import { Logger } from 'pino';

import router from './routes';
import { createQueues } from './queues';

export interface AppContext extends Koa.Context {
  log: Logger;
  pushSensorReadingQueue: Queue;
}

export interface AppState extends Koa.DefaultState {
}

export function createApp() {
  const app = new Koa<AppState, AppContext>();

  app.use(logger({ name: 'w3ather-sensor-api-http' }));

  // Generic error handling middleware.
  app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (error) {
      if(error.isJoi) {
        ctx.status = 400;
        ctx.body = { errors: error.details }
      } else {
        ctx.status = error.statusCode || error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        ctx.body = { errors: [error] };
      }

      ctx.app.emit('error', error, ctx);
    }
  });

  const { pushSensorReadingQueue } = createQueues({ redisUrl: process.env.REDIS_URL, prefix: 'w3ather' });
  app.context.pushSensorReadingQueue = pushSensorReadingQueue;

  app.use(bodyParser())
  app.use(router.routes());

  app.on('error', console.error);

  return app;
}
