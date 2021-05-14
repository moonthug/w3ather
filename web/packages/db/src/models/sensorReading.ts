import { Document, model, Schema } from 'mongoose';

export interface SensorReading {
  _id: string,
  batteryPercent: number,
  batteryVoltage: number,
  createdAt: Date,
  dewPoint: number,
  externalTemp: number,
  heatIndex: number,
  humidity: number,
  internalTemp: number,
  lux: number,
  rainfall: number,
  recordedAt: Date,
  solarVoltage: number,
  updatedAt: Date,
  uva: number,
  uvb: number,
  uvIndex: number,
  windDirection: string,
  windSpeed: number
}

export type SensorReadingModel = SensorReading & Document;

const sensorReadingSchema = new Schema({
  batteryPercent: Number,
  batteryVoltage: Number,
  dewPoint: Number,
  externalTemp: Number,
  heatIndex: Number,
  humidity: Number,
  internalTemp: Number,
  lux: Number,
  rainfall: Number,
  recordedAt: { index: true, unique: true, type: Date },
  solarVoltage: Number,
  uva: Number,
  uvb: Number,
  uvIndex: Number,
  windDirection: String,
  windSpeed: Number,
}, {
  timestamps: true,
  versionKey: false
});

export const sensorReadingModel = model<SensorReadingModel>(
  'sensor-reading',
  sensorReadingSchema,
  'w3ather_sensor-reading'
);