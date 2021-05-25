#include "multiSensor.h"

void MultiSensor::begin(TwoWire &wire) {
  sensor.begin(BME680_I2C_ADDR_PRIMARY, wire);
  checkIaqSensorStatus();

  bsec_virtual_sensor_t sensorList[5] = {
      BSEC_OUTPUT_RAW_TEMPERATURE,
      BSEC_OUTPUT_RAW_PRESSURE,
      BSEC_OUTPUT_RAW_HUMIDITY,
      BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_TEMPERATURE,
      BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_HUMIDITY,
  };

  sensor.updateSubscription(sensorList, 5, BSEC_SAMPLE_RATE_LP);
}

bool MultiSensor::checkIaqSensorStatus() {
  bool ok = true;

  if (sensor.status != BSEC_OK) {
    if (sensor.status < BSEC_OK) {
      ESP_LOGE("multi_sensor", "BSEC error code: %s", sensor.status);
    } else {
      ESP_LOGW("multi_sensor", "BSEC warning code: %s", sensor.status);
    }

    ok = false;
  }

  if (sensor.bme680Status != BME680_OK) {
    if (sensor.bme680Status < BME680_OK) {
      ESP_LOGE("multi_sensor", "BME680 error code: %s", sensor.bme680Status);
    } else {
      ESP_LOGW("multi_sensor", "BME680 warning code: %s", sensor.bme680Status);
    }

    return false;
  }

  return ok;
}

bool MultiSensor::read() {
  if (sensor.run() && checkIaqSensorStatus()) {
    ESP_LOGD("multi_sensor", "rawTemperature: %f", sensor.rawTemperature);
    ESP_LOGD("multi_sensor", "temperature: %f", sensor.temperature);
    ESP_LOGD("multi_sensor", "rawHumidity: %f", sensor.rawHumidity);
    ESP_LOGD("multi_sensor", "humidity %f", sensor.humidity);
    ESP_LOGD("multi_sensor", "pressure: %f", sensor.pressure);

    rawTemperature = sensor.rawTemperature;
    temperature = sensor.temperature;
    rawHumidity = sensor.rawHumidity;
    humidity = sensor.humidity;
    pressure = sensor.pressure;

    return true;
  }

  return false;
}
