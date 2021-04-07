import { QueueOptions } from './QueueOptions';
import { createQueue as createUploadQueue } from './uploadQueue';
import { Queue } from 'bull';

interface Workers {
  uploadQueue: Queue
}

export function createQueues(options: QueueOptions): Workers {
  return {
    uploadQueue: createUploadQueue(options)
  }
}
