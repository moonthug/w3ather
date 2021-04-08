import { Next, ParameterizedContext } from 'koa';
import { AppContext } from '../app';
import { IRouterParamContext } from 'koa-router';

interface Response {
  uploadQueueComplete: number
}

export async function getHealthMiddleware(ctx: ParameterizedContext<any, IRouterParamContext & AppContext>, next: Next) {

  ctx.body = {
    cronQueue: {
      complete: await ctx.cronQueue.getCompletedCount(),
      failed: await ctx.cronQueue.getFailedCount()
    },
    pushExternalReadingQueue: {
      complete: await ctx.pushExternalReadingQueue.getCompletedCount(),
      failed: await ctx.pushExternalReadingQueue.getFailedCount()
    },
    pushSensorReadingQueue: {
      complete: await ctx.pushSensorReadingQueue.getCompletedCount(),
      failed: await ctx.pushSensorReadingQueue.getFailedCount()
    }
  }
  return next();
};
