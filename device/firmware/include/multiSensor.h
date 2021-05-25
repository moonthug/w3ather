#ifndef W3ATHER_MULTISENSOR_H
#define W3ATHER_MULTISENSOR_H

#include "Wire.h"
#include "bsec.h"

#include "sensor.h"

#define SEALEVELPRESSURE_HPA (1013.25)

class MultiSensor: public I2CSensor {
private:
  Bsec sensor;
  bool checkIaqSensorStatus();

public:
  float rawTemperature;
  float temperature;
  float rawHumidity;
  float humidity;
  float pressure;

  void begin(TwoWire &wire);
  bool read();
};


#endif //W3ATHER_MULTISENSOR_H
