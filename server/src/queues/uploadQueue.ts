import Bull, { DoneCallback, Job, Queue } from 'bull';
import { QueueOptions } from './QueueOptions';

interface UploadQueueJob {
  temp: number
}

export function createQueue(options: QueueOptions) {
  const queue = new Bull<UploadQueueJob>('print', {
    redis: options.redisUrl,
    prefix: `${options.prefix}:upload-queue`
  });

  queue.process((job: Job<UploadQueueJob>, done: DoneCallback) => {
    console.log(`Process Job: ${job.id}`);
    return done(null, true);
  });

  return queue;
}
