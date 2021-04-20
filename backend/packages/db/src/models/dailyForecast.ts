import { Document, model, Schema } from 'mongoose';

export interface DailyForecast {
  _id: string,
  createdAt: Date,
  updatedAt: Date,
  source: string,
  recordedAt: Date,
  sunrise: Date,
  sunset: Date,
  temp: {
    morn: number,
    day: number,
    eve: number,
    night: number,
    min: number,
    max: number,
  },
  feelsLike: {
    morn: number,
    day: number,
    eve: number,
    night: number,
  },
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
  ],
}

export type DailyForecastModel = DailyForecast & Document;

const dailyForecastSchema = new Schema({
  source: { index: true, type: String },
  recordedAt: { index: true, unique: true, type: Date },
  sunrise: Date,
  sunset: Date,
  temp: {
    morn: Number,
    day: Number,
    eve: Number,
    night: Number,
    min: Number,
    max: Number,
  },
  feelsLike: {
    morn: Number,
    day: Number,
    eve: Number,
    night: Number,
  },
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
  timestamps: true
});

export const dailyForecastModel = model<DailyForecastModel>(
  'daily-forecasy',
  dailyForecastSchema,
  'w3ather_daily-forecast'
);
