#ifndef W3ATHER_MULTISENSONR_H
#define W3ATHER_MULTISENSONR_H

#include "Wire.h"

#include "bsec.h"

#define SEALEVELPRESSURE_HPA (1013.25)

class MultiSensor {
private:
  Bsec sensor;

  void checkIaqSensorStatus();
public:
  void begin(TwoWire &wire);
  void loop();
};


#endif //W3ATHER_MULTISENSONR_H
