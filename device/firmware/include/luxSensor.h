#ifndef W3ATHER_LUXSENSOR_H
#define W3ATHER_LUXSENSOR_H


#include "esp_log.h"
#include "Wire.h"
#include "BH1750.h"

#include "sensor.h"

class LuxSensor: public I2CSensor {
private:
  BH1750 sensor;

public:
  void begin(TwoWire &wire);
  bool read();

  float lux;
};

#endif //W3ATHER_LUXSENSOR_H
