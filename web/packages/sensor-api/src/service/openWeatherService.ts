import querystring from 'querystring';
import got from 'got';
import { DailyForecast, HourlyForecast, MinutelyForecast } from '@h0me/w3ather-db'

const SOURCE = 'openweather';

export interface CurrentAndForecastWeatherResponse {
  current: WeatherDataHourly,
  minutely: WeatherDataMinutely[],
  hourly: WeatherDataHourly[],
  daily: WeatherDataDaily[]
}

interface WeatherDataMinutely extends Omit<MinutelyForecast, '_id' | 'createdAt' | 'updatedAt'> {}
interface WeatherDataHourly extends Omit<HourlyForecast, '_id' | 'createdAt' | 'updatedAt'> {}
interface WeatherDataDaily extends Omit<DailyForecast, '_id' | 'createdAt' | 'updatedAt'> {}

interface OpenWeatherForecastMinutely {
  dt: number,
  precipitation: number,
}
interface OpenWeatherForecastHourly {
  dt: number,
  temp: number,
  feels_like: number,
  pressure: number,
  humidity: number
  dew_point: number,
  uvi: number,
  clouds: number,
  visibility: number,
  wind_speed: number
  wind_gust: number
  wind_deg: number
  pop: number
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ],
  rain?: {
    '1h': number,
  },
  snow?: {
    '1h': number,
  }
}
interface OpenWeatherForecastDaily {
  dt: number,
  sunrise: number,
  sunset: number,
  temp: {
    morn: number,
    day: number,
    eve: number,
    night: number,
    min: number,
    max: number,
  },
  feels_like: {
    morn: number,
    day: number,
    eve: number,
    night: number,
  },
  pressure: number,
  humidity: number
  dew_point: number,
  uvi: number,
  clouds: number,
  visibility: number,
  wind_speed: number,
  wind_gust: number,
  wind_deg: number,
  pop: number,
  rain?: number,
  snow?: number,
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ],
}

interface OpenWeatherOneCallWeatherResponse {
  lat: number,
  lon: number,
  current: OpenWeatherForecastHourly,
  minutely: OpenWeatherForecastMinutely[],
  hourly: OpenWeatherForecastHourly[],
  daily: OpenWeatherForecastDaily[],
}

export class OpenWeatherService {
  static async fetchCurrentAndForecastWeather(): Promise<CurrentAndForecastWeatherResponse> {
    const apiResponse = await this._request<OpenWeatherOneCallWeatherResponse>('/onecall', { exclude: 'alerts' });

    return {
      current: {
        source: SOURCE,
        recordedAt: new Date(apiResponse.current.dt * 1000),
        temp: apiResponse.current.temp,
        feelsLike: apiResponse.current.feels_like,
        pressure: apiResponse.current.pressure,
        humidity: apiResponse.current.humidity,
        dewPoint: apiResponse.current.dew_point,
        uvIndex: apiResponse.current.uvi,
        cloudiness: apiResponse.current.clouds,
        visibility: apiResponse.current.visibility,
        windSpeed: apiResponse.current.wind_speed,
        windGust: apiResponse.current.wind_gust,
        windDeg: apiResponse.current.wind_deg,
        probabilityOfPrecip:  apiResponse.current.pop,
        rainVolume: apiResponse.current.rain ? apiResponse.current.rain['1h'] : undefined,
        snowVolume: apiResponse.current.snow ? apiResponse.current.snow['1h'] : undefined,
        weather: apiResponse.current.weather
      },
      minutely: apiResponse.minutely.map(item => {
        return {
          source: SOURCE,
          recordedAt: new Date(item.dt * 1000),
          precipVolume: item.precipitation
        };
      }),
      hourly: apiResponse.hourly.map((item): WeatherDataHourly => {
        return {
          source: SOURCE,
          recordedAt: new Date(item.dt * 1000),
          temp: item.temp,
          feelsLike: item.feels_like,
          pressure: item.pressure,
          humidity: item.humidity,
          dewPoint: item.dew_point,
          uvIndex: item.uvi,
          cloudiness: item.clouds,
          visibility: item.visibility,
          windSpeed: item.wind_speed,
          windGust: item.wind_gust,
          windDeg: item.wind_deg,
          probabilityOfPrecip:  item.pop,
          rainVolume: item.rain ? item.rain['1h'] : undefined,
          snowVolume: item.snow ? item.snow['1h'] : undefined,
          weather: item.weather
        };
      }),
      daily: apiResponse.daily.map(item => {
        return {
          source: SOURCE,
          recordedAt: new Date(item.dt * 1000),
          sunrise: new Date(item.sunrise * 1000),
          sunset: new Date(item.sunset * 1000),
          temp: item.temp,
          feelsLike: item.feels_like,
          pressure: item.pressure,
          humidity: item.humidity,
          dewPoint: item.dew_point,
          uvIndex: item.uvi,
          cloudiness: item.clouds,
          visibility: item.visibility,
          windSpeed: item.wind_speed,
          windGust: item.wind_gust,
          windDeg: item.wind_deg,
          probabilityOfPrecip:  item.pop,
          rainVolume: item.rain,
          snowVolume: item.snow,
          weather: item.weather
        };
      }),
    }
  }

  private static _request<T>(path: string, params?: any): Promise<T> {
    const queryString = querystring.stringify({
        appid: process.env.OPENWEATHER_API_KEY,
        lat: process.env.OPENWEATHER_LAT,
        lon: process.env.OPENWEATHER_LON,
        units: 'metric',
        ...params
      })

    try {
      return got(
        `https://api.openweathermap.org/data/2.5${path}?${queryString}`,
      ).json();
    } catch (e) {
      // Log
      throw e;
    }
  }
}
