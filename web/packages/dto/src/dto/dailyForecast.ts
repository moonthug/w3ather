export interface DailyForecastResponse {
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
