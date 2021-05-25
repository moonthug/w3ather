#ifndef W3ATHER_VEML6075_SENSOR
#define W3ATHER_VEML6075_SENSOR

#include "esp_log.h"
#include "Wire.h"
#include "Adafruit_VEML6075.h"

#include "sensor.h"

class UVSensor: public I2CSensor {
private:
  Adafruit_VEML6075 sensor;

public:
  float uva;
  float uvb;
  float uvIndex;

  void begin(TwoWire &wire);
  bool read();
};


#endif //W3ATHER_VEML6075_SENSOR

