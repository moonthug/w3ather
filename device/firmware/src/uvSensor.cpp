#include "uvSensor.h"

void UVSensor::begin(TwoWire &wire) {
  if (!sensor.begin()) {
    ESP_LOGE("uv_sensor", "VEML6075 sensor not found");
  }

  // Set the integration constant
  sensor.setIntegrationTime(VEML6075_100MS);
  sensor.setHighDynamic(true);
  sensor.setForcedMode(false);

  // Set the calibration coefficients
  sensor.setCoefficients(
    2.22, 1.33,         // UVA_A and UVA_B coefficients
    2.95, 1.74,         // UVB_C and UVB_D coefficients
    0.001461, 0.002591  // UVA and UVB responses
  );
}

bool UVSensor::read() {
  ESP_LOGD("uv_sensor", "Raw UVA reading: %f", sensor.readUVA());
  ESP_LOGD("uv_sensor", "Raw UVB reading: %f", sensor.readUVB());
  ESP_LOGD("uv_sensor", "UV Index reading: %f", sensor.readUVI());

  uva = sensor.readUVA();
  uvb = sensor.readUVB();
  uvIndex = sensor.readUVI();

  return true;
}