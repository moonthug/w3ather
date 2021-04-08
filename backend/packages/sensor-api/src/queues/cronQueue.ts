import Bull, { DoneCallback, Job } from 'bull';
import { QueueOptions } from './QueueOptions';

import { pushExternalReading } from './tasks/pushExternalReading';
import { Task } from './tasks/Task';

interface CronJobData {
  name: string;
}

interface CreateQueueOptions extends QueueOptions {
  dependencies: Map<string, any>;
}

export function createQueue(options: CreateQueueOptions) {
  const logger = options.logger || console;
  const queue = new Bull<CronJobData>('cron-queue', {
    redis: options.redisUrl,
    prefix: options.prefix
  });

  const tasks = [pushExternalReading];
  const taskMap = new Map<string, Task>(tasks.map(task => [task.name, task]))

  tasks.forEach(task => queue.add({ name: task.name }, { repeat: { cron: task.cron } }))

  queue.process(async (job: Job<CronJobData>, done: DoneCallback) => {
    try {
      const task = taskMap.get(job.data.name);

      if (!task) {
        throw new Error('Invalid task name');
      }

      const dependencies = new Map<string, any>(
        task.dependencies.map(dependency => [dependency, options.dependencies.get(dependency)])
      );

      return task.handler(job, done, dependencies);

    } catch (e) {
      logger.error('job failed', job)
      return done(e);
    }
  });

  return queue;
}
