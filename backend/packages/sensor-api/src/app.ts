import Koa from 'koa';
import logger from 'koa-pino-logger';
import bodyParser from 'koa-bodyparser';
import { Queue } from 'bull';
import { StatusCodes } from 'http-status-codes';
import { Logger } from 'pino';

import router from './routes';

export interface AppContext extends Koa.Context {
  log: Logger;
  cronQueue: Queue;
  pushSensorReadingQueue: Queue;
}

export interface AppState extends Koa.DefaultState {
  logger: Logger
}

interface CreateAppOptions {
  queues: {
    cronQueue: Queue;
    pushExternalReadingQueue: Queue;
    pushSensorReadingQueue: Queue;
  }
}

export function createApp(options: CreateAppOptions) {
  const app = new Koa<AppState, AppContext>();

  // Logger middleware
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

  // Queues
  app.context.cronQueue = options.queues.cronQueue;
  app.context.pushExternalReadingQueue = options.queues.pushExternalReadingQueue;
  app.context.pushSensorReadingQueue = options.queues.pushSensorReadingQueue;

  // Middleware & Routes
  app.use(bodyParser())
  app.use(router.routes());

  app.on('error', console.error);

  return app;
}
