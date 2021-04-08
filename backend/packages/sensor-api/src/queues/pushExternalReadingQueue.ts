import Bull, { DoneCallback, Job } from 'bull';
import { dailyForecastModel, externalReadingModel, hourlyForecastModel, minutelyForecastModel } from '@h0me/w3ather-db';
import { QueueOptions } from './QueueOptions';
import { CurrentAndForecastWeatherResponse } from '../service/openWeatherService';

interface PushExternalReadingJobData {
  weatherData: CurrentAndForecastWeatherResponse
}

export function createQueue(options: QueueOptions) {
  const { logger } = options;

  const queue = new Bull<PushExternalReadingJobData>('push-external-reading-queue', {
    redis: options.redisUrl,
    prefix: options.prefix
  });

  queue.process(async (job: Job<PushExternalReadingJobData>, done: DoneCallback) => {
    const { current, minutely, hourly, daily } = job.data.weatherData;

    logger.info({ msg: 'running job', queue: 'push-external-reading-queue', id: job.id, attempts: job.attemptsMade })

    try {
      const externalReading = await externalReadingModel.findOneAndUpdate({ recordedAt: current.recordedAt }, current, { upsert: true });

      const minutelyForecasts = await minutelyForecastModel.bulkWrite(
        minutely.map(minutelyForecast => {
          return {
            updateOne: {
              filter: { recordedAt: minutelyForecast.recordedAt },
              update: minutelyForecast,
              upsert: true
            }};
        })
      );

      const hourlyForecasts = await hourlyForecastModel.bulkWrite(
        hourly.map(hourlyForecast => {
          return {
            updateOne: {
              filter: { recordedAt: hourlyForecast.recordedAt },
              update: hourlyForecast,
              upsert: true
            }};
        })
      );

      const dailyForecasts = await dailyForecastModel.bulkWrite(
        daily.map(dailyForecast => {
          return {
            updateOne: {
              filter: { recordedAt: dailyForecast.recordedAt },
              update: dailyForecast,
              upsert: true
            }};
        })
      );

      return done(null, {
        externalReadingNew: externalReading && externalReading.isNew,
        minutelyForecasts: {
          modifiedCount: minutelyForecasts.modifiedCount,
          upsertedCount: minutelyForecasts.upsertedCount
        },
        hourlyForecasts: {
          modifiedCount: hourlyForecasts.modifiedCount,
          upsertedCount: hourlyForecasts.upsertedCount
        },
        dailyForecasts: {
          modifiedCount: dailyForecasts.modifiedCount,
          upsertedCount: dailyForecasts.upsertedCount
        }
      });
    } catch (e) {
      logger.error('job failed', e);
      return done(e);
    }
  });

  return queue;
}
