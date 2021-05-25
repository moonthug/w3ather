#include "batterySensor.h"

bool BatterySensor::read() {
  batteryVoltage = analogueRead(sensorPin)
  ESP_LOGD("lux_sensor", "Light: %f", lux);
  return true;
}
