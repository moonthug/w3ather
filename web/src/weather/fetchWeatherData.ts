
export interface WeatherData {
  date: Date;
  temperature: number;
  temperatureMin: number;
  temperatureMax: number;
  feelsLike: number;
  pressure: number;
  humidity: number;
  visibility: number;
  wind?: {
    gust?: number,
    speed: number,
    degrees: number
  },
  clouds?: {
    all: number
  },
  rain?: {
    nextHour: number,
    next3Hours: number
  },
  snow?: {
    nextHour: number,
    next3Hours: number
  }
}

interface OpenWeatherResponse {
  coord: {
    lon: number,
    lat: number
  },
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ],
  main: {
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number
    temp_min: number,
    temp_max: number,
  },
  visibility: number,
  wind?: {
    gust?: number,
    speed: number,
    deg: number
  },
  clouds?: {
    all: number
  },
  rain?: {
    '1h': number,
    '3h': number
  },
  snow?: {
    '1h': number,
    '3h': number
  }
  dt: number,
  sys: {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
  }
}

function parseWeather(apiResponse: OpenWeatherResponse): WeatherData {
  return {
    date: new Date(apiResponse.dt),
    temperature: apiResponse.main.temp,
    temperatureMin: apiResponse.main.temp_min,
    temperatureMax: apiResponse.main.temp_max,
    feelsLike: apiResponse.main.feels_like,
    pressure: apiResponse.main.pressure,
    humidity: apiResponse.main.humidity,
    visibility: apiResponse.visibility,
    wind: apiResponse.wind
      ? {
        gust: apiResponse.wind.gust,
        speed: apiResponse.wind.speed,
        degrees: apiResponse.wind.deg
      }
      : undefined,
    clouds: apiResponse.clouds
      ? {
        all: apiResponse.clouds.all
      }
      : undefined,
    rain: apiResponse.rain
      ? {
        nextHour: apiResponse.rain['1h'],
        next3Hours: apiResponse.rain['3h']
      }
      : undefined,
    snow: apiResponse.snow
      ? {
        nextHour: apiResponse.snow['1h'],
        next3Hours: apiResponse.snow['3h']
      }
      : undefined,
  }
}

export async function fetchWeatherData() {
  let data;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${process.env.REACT_APP_OPENWEATHER_LOCATION}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`,
      {
        method: "GET",
      });
    data = await response.json();
  } catch (e) {
    // Log
    throw e;
  }

  return parseWeather(data as OpenWeatherResponse);
}
