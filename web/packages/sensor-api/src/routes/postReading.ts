import { Next, ParameterizedContext } from 'koa';
import joi from 'joi';
import { AppContext } from '../app';
import { createSensorReading, SensorReadingData } from '../handler/createSensorReading';
import { IRouterParamContext } from 'koa-router';

const schema = joi.object({
  batteryPercent: joi.number().required(),
  batteryVoltage: joi.number().required(),
  clientName:joi.string().required(),
  clientVersion:joi.string().required(),
  dewPoint:joi.number().required(),
  externalTemp:joi.number().required(),
  heatIndex: joi.number().required(),
  humidity: joi.number().required(),
  internalTemp: joi.number().required(),
  lux: joi.number().required(),
  pressure: joi.number().required(),
  rainfall: joi.number().required(),
  recordedAt: joi.date().required(),
  solarPercent: joi.number().required(),
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

    const { body } = ctx.request;

    ctx.state.sensorReading = {
      batteryPercent: parseFloat(body.batteryPercent),
      batteryVoltage: parseFloat(body.batteryVoltage),
      clientName: body.clientName,
      clientVersion: body.clientVersion,
      dewPoint: parseFloat(body.dewPoint),
      externalTemp: parseFloat(body.externalTemp),
      heatIndex: parseFloat(body.heatIndex),
      humidity: parseFloat(body.humidity),
      internalTemp: parseFloat(body.internalTemp),
      lux: parseFloat(body.lux),
      pressure: parseFloat(body.pressure),
      rainfall: parseFloat(body.rainfall),
      recordedAt: new Date(body.recordedAt),
      solarPercent: parseFloat(body.solarPercent),
      solarVoltage: parseFloat(body.solarVoltage),
      uva: parseFloat(body.uva),
      uvb: parseFloat(body.uvb),
      uvIndex: parseFloat(body.uvIndex),
      windDirection: body.windDirection,
      windSpeed: parseFloat(body.windSpeed),
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
    ctx.status = 201;

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
