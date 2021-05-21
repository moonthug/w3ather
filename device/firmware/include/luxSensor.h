#ifndef W3ATHER_LUXSENSOR_H
#define W3ATHER_LUXSENSOR_H

#include "Wire.h"
#include "BH1750.h"

#include "sensor.h"

class LuxSensor: public Sensor {
private:
  BH1750 sensor;

public:
  void begin(TwoWire &wire);
  void loop();
};

#endif //W3ATHER_LUXSENSOR_H
