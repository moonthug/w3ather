#include "luxSensor.h"

void LuxSensor::begin(TwoWire &wire) {
  sensor.begin();
}

void LuxSensor::loop() {
  float lux = sensor.readLightLevel();
  Serial.print("Light: ");
  Serial.print(lux);
  Serial.println(" lx");
}
