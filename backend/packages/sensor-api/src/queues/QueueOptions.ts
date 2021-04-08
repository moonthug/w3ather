interface LoggerLike {
  info: (message: any, ...args: any[]) => any;
  error: (message: any, ...args: any[]) => any;
}

export interface QueueOptions {
  logger: LoggerLike;
  prefix: string;
  redisUrl: string;
}
