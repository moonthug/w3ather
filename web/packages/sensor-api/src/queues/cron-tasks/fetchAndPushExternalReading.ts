import { DoneCallback, Job } from 'bull';
import { CronTask } from './CronTask';
import { fetchExternalReading } from '../../handler/fetchExternalReading';

export const fetchAndPushExternalReading: CronTask = {
  name: 'fetchAndPushExternalReading',
  cron: process.env.CRON_FETCH_EXTERNAL_READING,
  dependencies: [
    'pushExternalReadingQueue',
    'logger'
  ],
  handler: async (job: Job, done: DoneCallback, dependencies: Map<string, any>) => {
    const pushExternalReadingQueue = dependencies.get('pushExternalReadingQueue');
    const logger = dependencies.get('logger');

    try {
      await fetchExternalReading(pushExternalReadingQueue);
      return done();
    } catch (e) {
      logger.error(e);
      return done(e)
    }
  }
};
