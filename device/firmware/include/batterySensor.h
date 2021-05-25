#ifndef W3ATHER_BATTERYSENSOR_H
#define W3ATHER_BATTERYSENSOR_H

#include "esp_log.h"

#include "sensor.h"

class BatterySensor: public AnalogSensor {
private:
public:
  bool read();

  float batteryPercent;
  float batteryVoltage;
};

#endif //W3ATHER_BATTERYSENSOR_H
