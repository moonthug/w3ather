import { Next, ParameterizedContext } from 'koa';
import { AppContext } from '../app';
import { IRouterParamContext } from 'koa-router';

interface Response {
  uploadQueueComplete: number
}

export async function getHealthMiddleware(ctx: ParameterizedContext<any, IRouterParamContext & AppContext>, next: Next) {
  ctx.body = {
    pushSensorReadingQueueCompleteCount: await ctx.pushSensorReadingQueue.getCompletedCount(),
    pushSensorReadingQueueFailedCount: await ctx.pushSensorReadingQueue.getFailedCount()
  }
  return next();
};
