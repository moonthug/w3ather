#ifndef W3ATHER_WEATHERUTILS_H
#define W3ATHER_WEATHERUTILS_H


class WeatherUtils {
public:
  static double calculateHeatIndex(float temperature, float humidity) {
    const double c1 = -42.379;
    const double c2 = 2.04901523;
    const double c3 = 10.14333127;
    const double c4 = -.22475541;
    const double c5 = -0.00683783;
    const double c6 = -0.05481717;
    const double c7 = 0.00122874;
    const double c8 = 0.00085282;
    const double c9 = -0.00000199;

    double heatIndex = c1 + (c2 * temperature)
                       + (c3 * humidity)
                       + (c4 * temperature * humidity)
                       + (c5 * (temperature * temperature))
                       + (c6 * (humidity * humidity))
                       + (c7 * (temperature * temperature) * humidity)
                       + (c8 * temperature * (humidity * humidity))
                       + (c9 * (temperature * temperature) * (humidity * humidity));

    return heatIndex * 9.0 / 5.0 + 32;
  }

  static double calculateDewPoint(double temperature, float humidity) {
    if (humidity == 0) return temperature;

    double dewNumerator = 243.04 * (log(double(humidity) / 100.0) + ((17.625 * temperature) / (temperature + 243.04)));
    double dewDenominator = 17.625 - log(double(humidity) / 100.0) - ((17.625 * temperature) / (temperature + 243.04));

    if (dewNumerator == 0) dewNumerator=1;

    return dewNumerator / dewDenominator;
  }
};


#endif //W3ATHER_WEATHERUTILS_H
