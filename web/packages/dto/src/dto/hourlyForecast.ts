export interface HourlyForecastResponse {
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
