import { Queue } from 'bull';

import { SensorReading } from '@h0me/w3ather-db';

export interface SensorReadingData extends Omit<SensorReading, '_id' | 'createdAt' | 'updatedAt'> {}

export async function createSensorReading(pushSensorReadingQueue: Queue, data: SensorReadingData) {
  return pushSensorReadingQueue.add(data);
}
