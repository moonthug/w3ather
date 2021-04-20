import { DoneCallback, Job } from 'bull';

export interface Task {
  name: string;
  cron: string;
  dependencies?: string[];
  handler: <T>(job: Job, done: DoneCallback, dependencies?: Map<string, any>) => Promise<void>
}
