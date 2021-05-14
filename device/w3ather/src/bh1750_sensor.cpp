//
// Created by Alex Coulcher.
//

#include "bh1750_sensor.h"

void BH1750_Sensor::begin(TwoWire &wire) {
  lightMeter.begin();
}

void BH1750_Sensor::loop() {
  float lux = lightMeter.readLightLevel();
  Serial.print("Light: ");
  Serial.print(lux);
  Serial.println(" lx");
}
