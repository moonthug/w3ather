#ifndef W3ATHER_SENSOR_H
#define W3ATHER_SENSOR_H

#include "Wire.h"

struct SensorReading {
  const char* batteryVoltage;
  const char* externalTemp;
  const char* humidity;
  const char* internalTemp;
  const char* lux;
  const char* rainfall;
  const char* recordedAt;
  const char* solarVoltage;
  const char* uva;
  const char* uvb;
  const char* uvIndex;
  const char* windDirection;
  const char* windSpeed;
};

class Sensor {
public:
 virtual void begin(TwoWire &wire);
};

#endif //W3ATHER_SENSOR_H
