//
// Created by Alex Coulcher.
//

#ifndef W3ATHER_BME680_SENSOR_H
#define W3ATHER_BME680_SENSOR_H

#include "Wire.h"

#include "bsec.h"

#define SEALEVELPRESSURE_HPA (1013.25)

class BME680_Sensor {
private:
  Bsec iaqSensor;

  void checkIaqSensorStatus();
public:
  void begin(TwoWire &wire);
  void loop();
};


#endif //W3ATHER_BME680_SENSOR_H
