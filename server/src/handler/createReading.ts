import { readingModel } from '../models/reading';

export interface ReadingData {
  recordedAt: Date;
  internalTemp: number;
  externalTemp: number;
  humidity: number;
  lux: number;
  rainfall: number;
  uvIndex: number;
  windSpeed: number;
  windDirection: string;
}

export async function createReading(data: ReadingData) {
  return readingModel.create(data);
}
