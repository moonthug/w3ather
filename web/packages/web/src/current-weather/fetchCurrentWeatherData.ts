

export async function fetchCurrentWeatherData() {
  let data;
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_GATWEWAY}/weather/current`,
      {
        method: 'GET',
      });
    data = await response.json();
  } catch (e) {
    // Log
    throw e;
  }

  return data;
}
