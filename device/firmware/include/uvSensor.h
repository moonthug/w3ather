#ifndef W3ATHER_VEML6075_SENSOR
#define W3ATHER_VEML6075_SENSOR

#include "Wire.h"
#include "Adafruit_VEML6075.h"

#include "sensor.h"

class UVSensor: public Sensor {
private:
  Adafruit_VEML6075 sensor;

public:
  void begin(TwoWire &wire);
  void loop();
};


#endif //W3ATHER_VEML6075_SENSOR

