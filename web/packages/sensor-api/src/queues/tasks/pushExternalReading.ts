import { DoneCallback, Job, Queue } from 'bull';
import { Task } from './Task';
import { createExternalReading } from '../../handler/createExternalReading';

export const pushExternalReading: Task = {
  name: 'pushExternalReading',
  cron: process.env.CRON_PUSH_EXTERNAL_READING,
  dependencies: [
    'pushExternalReadingQueue',
    'logger'
  ],
  handler: async (job: Job, done: DoneCallback, dependencies: Map<string, any>) => {
    const pushExternalReadingQueue = dependencies.get('pushExternalReadingQueue');
    const logger = dependencies.get('logger');

    try {
      await createExternalReading(pushExternalReadingQueue);
      return done();
    } catch (e) {
      logger.error(e);
      return done(e)
    }
  }
};
