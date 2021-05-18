//
// Created by Alex Coulcher.
//

#ifndef W3ATHER_VEML6075_SENSOR
#define W3ATHER_VEML6075_SENSOR

#include "Wire.h"

#include "Adafruit_VEML6075.h"

class VEML6075_Sensor {
private:
  Adafruit_VEML6075 uv;

public:
  void begin(TwoWire &wire);
  void loop();
};


#endif //W3ATHER_VEML6075_SENSOR

