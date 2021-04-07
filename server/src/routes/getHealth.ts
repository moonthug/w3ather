import { Middleware } from 'koa';
import { AppContext } from '../app';

interface Response {
  uploadQueueComplete: number
}

export const getHealthMiddleware: Middleware<AppContext> = async (ctx, next) => {
  ctx.body = {
    uploadQueueComplete: await ctx.uploadQueue.getCompletedCount()
  }
  return next();
};
