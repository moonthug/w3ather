import { Document, model, Schema } from 'mongoose';

export interface SensorReading {
  _id: string,
  batteryPercent: number,
  batteryVoltage: number,
  clientName: string,
  clientVersion: string,
  createdAt: Date,
  dewPoint: number,
  externalTemp: number,
  heatIndex: number,
  humidity: number,
  internalTemp: number,
  lux: number,
  pressure: number;
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
  clientName: String,
  clientVersion: String,
  dewPoint: Number,
  externalTemp: Number,
  heatIndex: Number,
  humidity: Number,
  internalTemp: Number,
  lux: Number,
  pressure: Number,
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
