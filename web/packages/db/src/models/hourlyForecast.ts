import { Document, model, Schema } from 'mongoose';

export interface HourlyForecast {
  _id: string,
  createdAt: Date,
  updatedAt: Date,
  source: string,
  recordedAt: Date,
  temp: number,
  feelsLike: number,
  pressure: number,
  humidity: number
  dewPoint: number,
  uvIndex: number,
  cloudiness: number,
  visibility: number,
  windSpeed: number,
  windGust: number,
  windDeg: number,
  probabilityOfPrecip: number,
  rainVolume?: number,
  snowVolume?: number,
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ]
}

export type HourlyForecastModel = HourlyForecast & Document;

const hourlyForecastSchema = new Schema({
  source: { index: true, type: String },
  recordedAt: { index: true, unique: true, type: Date },
  temp: Number,
  feelsLike: Number,
  pressure: Number,
  humidity: Number,
  dewPoint: Number,
  uvIndex: Number,
  cloudiness: Number,
  visibility: Number,
  windSpeed: Number,
  windGust: Number,
  windDeg: Number,
  probabilityOfPrecip: Number,
  rainVolume: Number,
  snowVolume: Number,
  weather: [
    {
      _id: false,
      id: Number,
      main: String,
      description: String,
      icon: String
    }
  ]
}, {
  timestamps: true,
  versionKey: false
});

export const hourlyForecastModel = model<HourlyForecastModel>(
  'hourly-forecasy',
  hourlyForecastSchema,
  'w3ather_hourly-forecast'
);
