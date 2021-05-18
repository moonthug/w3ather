#include "multiSensonr.h"

void MultiSensor::begin(TwoWire &wire) {
  sensor.begin(BME680_I2C_ADDR_PRIMARY, wire);
  Serial.println("SEC library version " + String(sensor.version.major) + "." + String(sensor.version.minor) + "." + String(sensor.version.major_bugfix) + "." + String(sensor.version.minor_bugfix));
  checkIaqSensorStatus();

  bsec_virtual_sensor_t sensorList[10] = {
      BSEC_OUTPUT_RAW_TEMPERATURE,
      BSEC_OUTPUT_RAW_PRESSURE,
      BSEC_OUTPUT_RAW_HUMIDITY,
      BSEC_OUTPUT_RAW_GAS,
      BSEC_OUTPUT_IAQ,
      BSEC_OUTPUT_STATIC_IAQ,
      BSEC_OUTPUT_CO2_EQUIVALENT,
      BSEC_OUTPUT_BREATH_VOC_EQUIVALENT,
      BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_TEMPERATURE,
      BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_HUMIDITY,
  };

  sensor.updateSubscription(sensorList, 10, BSEC_SAMPLE_RATE_LP);
}

void MultiSensor::checkIaqSensorStatus()  {
  if (sensor.status != BSEC_OK) {
    if (sensor.status < BSEC_OK) {
      Serial.println("BSEC error code : " + String(sensor.status));
    } else {
      Serial.println("BSEC warning code : " + String(sensor.status));
    }
  }

  if (sensor.bme680Status != BME680_OK) {
    if (sensor.bme680Status < BME680_OK) {
      Serial.println("BME680 error code : " + String(sensor.bme680Status));
    } else {
      Serial.println("BME680 warning code : " + String(sensor.bme680Status));
    }
  }
}

void MultiSensor::loop() {
  unsigned long time_trigger = millis();
  if (sensor.run()) { // If new data is available
    Serial.print(String(time_trigger));
    Serial.print(", " + String(sensor.rawTemperature));
    Serial.print(", " + String(sensor.pressure));
    Serial.print(", " + String(sensor.rawHumidity));
    Serial.print(", " + String(sensor.gasResistance));
    Serial.print(", " + String(sensor.iaq));
    Serial.print(", " + String(sensor.iaqAccuracy));
    Serial.print(", " + String(sensor.temperature));
    Serial.print(", " + String(sensor.humidity));
    Serial.print(", " + String(sensor.staticIaq));
    Serial.print(", " + String(sensor.co2Equivalent));
    Serial.println(", " + String(sensor.breathVocEquivalent));
    checkIaqSensorStatus();
  }
}
