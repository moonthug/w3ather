import { QueueOptions } from './QueueOptions';
import { createQueue as createCronQueue } from './cronQueue';
import { createQueue as createPushExternalReadingQueue } from './pushExternalReadingQueue';
import { createQueue as createPushSensorReadingQueue } from './pushSensorReadingQueue';
import { Queue } from 'bull';

interface Queues {
  cronQueue: Queue
  pushExternalReadingQueue: Queue
  pushSensorReadingQueue: Queue
}

export function createQueues(options: QueueOptions): Queues {
  const pushExternalReadingQueue = createPushExternalReadingQueue(options);
  const pushSensorReadingQueue = createPushSensorReadingQueue(options);

  return {
    cronQueue: createCronQueue({
      ...options,
      dependencies: new Map<string, any>([
        ['pushExternalReadingQueue', pushExternalReadingQueue],
        ['logger', options.logger],
      ])
    }),
    pushExternalReadingQueue,
    pushSensorReadingQueue,
  }
}
