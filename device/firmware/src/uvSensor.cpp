#include <uvSensor.h>

void UVSensor::begin(TwoWire &wire) {
  if (!sensor.begin()) {
    Serial.println("Failed to communicate with VEML6075 sensor, check wiring?");
  }
  Serial.println("Found VEML6075 sensor");

  // Set the integration constant
  sensor.setIntegrationTime(VEML6075_100MS);
  sensor.setHighDynamic(true);
  sensor.setForcedMode(false);

  // Set the calibration coefficients
  sensor.setCoefficients(2.22, 1.33,  // UVA_A and UVA_B coefficients
                     2.95, 1.74,  // UVB_C and UVB_D coefficients
                     0.001461, 0.002591); // UVA and UVB responses
}

void UVSensor::loop() {
  Serial.print("Raw UVA reading:  "); Serial.println(sensor.readUVA());
  Serial.print("Raw UVB reading:  "); Serial.println(sensor.readUVB());
  Serial.print("UV Index reading: "); Serial.println(sensor.readUVI());
}

