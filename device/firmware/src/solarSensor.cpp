#include "solarSensor.h"

bool SolarSensor::read() {
  float value = analogRead(sensorPin) / 4095;
  solarPercent = value * 100;
  solarVoltage = value * SOLAR_VOLTAGE;

  ESP_LOGD("solar_sensor", "Solar Percent: %f", solarPercent);
  ESP_LOGD("solar_sensor", "Solar Voltage: %f", solarVoltage);

  return true;
}
