import { Middleware } from 'koa';
import joi from 'joi';
import { AppContext } from '../app';
import { createReading, ReadingData } from '../handler/createReading';

const schema = joi.object({
  recordedAt: joi.date().required(),
  internalTemp: joi.number().required(),
  externalTemp:joi.number().required(),
  humidity: joi.number().required(),
  lux: joi.number().required(),
  rainfall: joi.number().required(),
  uvIndex: joi.number().required(),
  windSpeed: joi.number().required(),
  windDirection: joi.string().required(),
})

interface PostReadingMiddlewareCtxState {
  reading: ReadingData;
}

/**
 *
 * @param ctx
 * @param next
 */
export const validationMiddleware: Middleware<PostReadingMiddlewareCtxState> = async (ctx, next) => {
  try {
    const { error } = schema.validate(
      ctx.request.body
    );

    if (error) throw error;

    ctx.state.reading = {
      recordedAt: new Date(ctx.request.body.recordedAt),
      internalTemp: parseFloat(ctx.request.body.internalTemp),
      externalTemp: parseFloat(ctx.request.body.externalTemp),
      humidity: parseFloat(ctx.request.body.humidity),
      lux: parseFloat(ctx.request.body.lux),
      rainfall: parseFloat(ctx.request.body.rainfall),
      uvIndex: parseFloat(ctx.request.body.uvIndex),
      windSpeed: parseFloat(ctx.request.body.windSpeed),
      windDirection: ctx.request.body.windDirection
    }

    return next();
  } catch (error) {
    // Logging
    throw error;
  }
}

/**
 *
 * @param ctx
 * @param next
 */
export const postReadingMiddleware: Middleware<PostReadingMiddlewareCtxState, AppContext> = async (ctx, next) => {
  try {
    const { reading } = ctx.state;

    ctx.body = await createReading(reading);

  } catch (e) {
    throw e;
  }
  return next();
}

/**
 *
 */
export const postReadingMiddlewares = [
  validationMiddleware,
  postReadingMiddleware
]
