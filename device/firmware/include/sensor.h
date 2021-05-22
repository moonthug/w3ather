#ifndef W3ATHER_SENSOR_H
#define W3ATHER_SENSOR_H

#include "Wire.h"

struct SensorReading {
  float batteryPercent;
  float batteryVoltage;
  float dewPoint;
  float externalTemp;
  float heatIndex;
  float humidity;
  float internalTemp;
  float lux;
  float rainfall;
  const char* recordedAt;
  float solarVoltage;
  float uva;
  float uvb;
  int uvIndex;
  const char* windDirection;
  float windSpeed;

  const char* clientName;
  const char* clientVersion;
};

class Sensor {
public:
 virtual void begin(TwoWire &wire);
};

#endif //W3ATHER_SENSOR_H
