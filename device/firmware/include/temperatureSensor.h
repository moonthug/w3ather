#ifndef W3ATHER_TEMPERATURESENSOR_H
#define W3ATHER_TEMPERATURESENSOR_H

#include "Arduino.h"
#include "OneWire.h"
#include "esp_log.h"
#include "DallasTemperature.h"

#include "sensor.h"

class TemperatureSensor: public OneWireSensor {
private:
  DallasTemperature sensor;

public:
  void begin(OneWire &wire);
  bool read();

  float temperature;
};


#endif //W3ATHER_TEMPERATURESENSOR_H
