#include "batterySensor.h"

bool BatterySensor::read() {
  float value = analogRead(sensorPin) / 4095;
  batteryPercent = value * 100;
  batteryVoltage = value * BATTERY_VOLTAGE;

  ESP_LOGD("battery_sensor", "Battery Percent: %f", batteryPercent);
  ESP_LOGD("battery_sensor", "Battery Voltage: %f", batteryVoltage);

  return true;
}
