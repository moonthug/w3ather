#include "temperatureSensor.h"

void TemperatureSensor::begin(OneWire &wire) {
  sensor = DallasTemperature(&wire);
}

bool TemperatureSensor::read() {
  temperature = sensor.getTempCByIndex(0);
  ESP_LOGD("temperature_sensor", "Temperature: %f", temperature);
  return true;
}
