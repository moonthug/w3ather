import Bull, { DoneCallback, Job } from 'bull';
import { QueueOptions } from './QueueOptions';
import { SensorReadingData } from '../handler/createSensorReading';
import { sensorReadingModel } from '../models/sensorReading';

interface PushSensorReadingJobData {
  sensorReading: SensorReadingData
}

export function createQueue(options: QueueOptions) {
  const queue = new Bull<PushSensorReadingJobData>('push-sensor-reading-queue', {
    redis: options.redisUrl,
    prefix: options.prefix
  });

  queue.process(async (job: Job<PushSensorReadingJobData>, done: DoneCallback) => {
    try {
      const reading = await sensorReadingModel.create(job.data);
      return done(null, reading);
    } catch (e) {
      return done(e);
    }
  });

  return queue;
}
