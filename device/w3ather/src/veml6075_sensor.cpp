//
// Created by Alex Coulcher.
//

#include <veml6075_sensor.h>

void VEML6075_Sensor::begin(TwoWire &wire) {
  if (! uv.begin()) {
    Serial.println("Failed to communicate with VEML6075 sensor, check wiring?");
  }
  Serial.println("Found VEML6075 sensor");

  // Set the integration constant
  uv.setIntegrationTime(VEML6075_100MS);
  uv.setHighDynamic(true);
  uv.setForcedMode(false);

  // Set the calibration coefficients
  uv.setCoefficients(2.22, 1.33,  // UVA_A and UVA_B coefficients
                     2.95, 1.74,  // UVB_C and UVB_D coefficients
                     0.001461, 0.002591); // UVA and UVB responses
}

void VEML6075_Sensor::loop() {
  Serial.print("Raw UVA reading:  "); Serial.println(uv.readUVA());
  Serial.print("Raw UVB reading:  "); Serial.println(uv.readUVB());
  Serial.print("UV Index reading: "); Serial.println(uv.readUVI());
}

