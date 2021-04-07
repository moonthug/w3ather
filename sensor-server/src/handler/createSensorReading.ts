import { SensorReading } from '../models/sensorReading';
import { Queue } from 'bull';

export interface SensorReadingData extends Omit<SensorReading, '_id' | 'createdAt' | 'updatedAt'> {}

export async function createSensorReading(pushSensorReadingQueue: Queue, data: SensorReadingData) {
  return pushSensorReadingQueue.add(data);
}
