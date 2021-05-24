#include "luxSensor.h"

void LuxSensor::begin(TwoWire &wire) {
  if (!sensor.begin()) {
    ESP_LOGE("lux_sensor", "BH1750 sensor not found");
  }
}

bool LuxSensor::read() {
  lux = sensor.readLightLevel();
  ESP_LOGD("lux_sensor", "Light: %f", lux);
  return true;
}
