import { Next, ParameterizedContext } from 'koa';
import joi from 'joi';
import { AppContext } from '../app';
import { createSensorReading, SensorReadingData } from '../handler/createSensorReading';
import { IRouterParamContext } from 'koa-router';

const schema = joi.object({
  batteryPercent: joi.number().required(),
  batteryVoltage: joi.number().required(),
  dewPoint:joi.number().required(),
  externalTemp:joi.number().required(),
  heatIndex: joi.number().required(),
  humidity: joi.number().required(),
  internalTemp: joi.number().required(),
  lux: joi.number().required(),
  rainfall: joi.number().required(),
  recordedAt: joi.date().required(),
  solarVoltage: joi.number().required(),
  uva: joi.number().required(),
  uvb: joi.number().required(),
  uvIndex: joi.number().required(),
  windDirection: joi.string().required(),
  windSpeed: joi.number().required(),
});

interface PostReadingMiddlewareCtxState {
  sensorReading: SensorReadingData;
}

/**
 *
 * @param ctx
 * @param next
 */
async function validationMiddleware(ctx: ParameterizedContext<PostReadingMiddlewareCtxState, IRouterParamContext & AppContext>, next: Next) {
  try {
    const { error } = schema.validate(
      ctx.request.body
    );

    if (error) throw error;

    ctx.state.sensorReading = {
      batteryPercent: parseFloat(ctx.request.body.batteryPercent),
      batteryVoltage: parseFloat(ctx.request.body.batteryVoltage),
      dewPoint: parseFloat(ctx.request.body.dewPoint),
      externalTemp: parseFloat(ctx.request.body.externalTemp),
      heatIndex: parseFloat(ctx.request.body.heatIndex),
      humidity: parseFloat(ctx.request.body.humidity),
      internalTemp: parseFloat(ctx.request.body.internalTemp),
      lux: parseFloat(ctx.request.body.lux),
      rainfall: parseFloat(ctx.request.body.rainfall),
      recordedAt: new Date(ctx.request.body.recordedAt),
      solarVoltage: parseFloat(ctx.request.body.solarVoltage),
      uva: parseFloat(ctx.request.body.uva),
      uvb: parseFloat(ctx.request.body.uvb),
      uvIndex: parseFloat(ctx.request.body.uvIndex),
      windDirection: ctx.request.body.windDirection,
      windSpeed: parseFloat(ctx.request.body.windSpeed),
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
async function postReadingMiddleware(ctx: ParameterizedContext<PostReadingMiddlewareCtxState, IRouterParamContext & AppContext>, next: Next) {
  try {
    const { pushSensorReadingQueue } = ctx;
    const { sensorReading } = ctx.state;

    const job = await createSensorReading(pushSensorReadingQueue, sensorReading);

    ctx.body = { id: job.id };

    return next();
  } catch (error) {
    throw error;
  }
}

/**
 *
 */
export const postReadingMiddlewares = [
  validationMiddleware,
  postReadingMiddleware
]
