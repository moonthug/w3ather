#ifndef W3ATHER_SOLARSENSOR_H
#define W3ATHER_SOLARSENSOR_H

#define SOLAR_VOLTAGE 7

#include "Arduino.h"
#include "esp_log.h"

#include "sensor.h"

class SolarSensor: public AnalogSensor {
private:
public:
  bool read();

  float solarPercent;
  float solarVoltage;
};

#endif //W3ATHER_SOLARSENSOR_H
