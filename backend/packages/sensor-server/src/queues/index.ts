import { QueueOptions } from './QueueOptions';
import { createQueue as createPushSensorReadingQueue } from './pushSensorReadingQueue';
import { Queue } from 'bull';

interface Workers {
  pushSensorReadingQueue: Queue
}

export function createQueues(options: QueueOptions): Workers {
  return {
    pushSensorReadingQueue: createPushSensorReadingQueue(options)
  }
}
