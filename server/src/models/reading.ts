import { Document, model, Schema } from 'mongoose';

export interface Reading {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
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

export type ReadingModel = Reading & Document;

const readingSchema = new Schema({
  createdAt: Date,
  updatedAt: Date,
  recordedAt: Date,
  internalTemp: Number,
  externalTemp: Number,
  humidity: Number,
  lux: Number,
  rainfall: Number,
  uvIndex: Number,
  windSpeed: Number,
  windDirection: String,
}, {
  timestamps: true,
  versionKey: false
});

export const readingModel = model<ReadingModel>(
  'reading',
  readingSchema,
  'w3ather-reading'
);
