import Bull, { DoneCallback, Job } from 'bull';
import { sensorReadingModel } from '@h0me/w3ather-db';
import { QueueOptions } from './QueueOptions';
import { SensorReadingData } from '../handler/createSensorReading';

interface PushSensorReadingJobData {
  sensorReading: SensorReadingData
}

export function createQueue(options: QueueOptions) {
  const { logger } = options;

  const queue = new Bull<PushSensorReadingJobData>('push-sensor-reading-queue', {
    redis: options.redisUrl,
    prefix: options.prefix
  });

  queue.process(async (job: Job<PushSensorReadingJobData>, done: DoneCallback) => {
    logger.info({ msg: 'running job', queue: 'push-sensor-reading-queue', id: job.id, attempts: job.attemptsMade })

    try {
      const reading = await sensorReadingModel.create(job.data);
      return done(null, reading);
    } catch (e) {
      return done(e);
    }
  });

  return queue;
}
