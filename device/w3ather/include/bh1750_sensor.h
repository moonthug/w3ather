//
// Created by Alex Coulcher.
//

#ifndef W3ATHER_BH1750_SENSOR_H
#define W3ATHER_BH1750_SENSOR_H

#include "Wire.h"
#include "BH1750.h"

class BH1750_Sensor {
private:
  BH1750 lightMeter;

public:
  void begin(TwoWire &wire);
  void loop();
};

#endif //W3ATHER_BH1750_SENSOR_H
