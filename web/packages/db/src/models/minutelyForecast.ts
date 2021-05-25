import { Document, model, Schema } from 'mongoose';

export interface MinutelyForecast {
  _id: string;
  createdAt: Date,
  updatedAt: Date,
  source: string,
  recordedAt: Date,
  precipVolume: number
}

export type MinutelyForecastModel = MinutelyForecast & Document;

const minutelyForecastSchema = new Schema({
  source: { index: true, type: String },
  recordedAt: { index: true, unique: true, type: Date },
  precipVolume: Number,
}, {
  timestamps: true,
  versionKey: false
});

export const minutelyForecastModel = model<MinutelyForecastModel>(
  'minutely-forecasy',
  minutelyForecastSchema,
  'w3ather_minutely-forecast'
);
