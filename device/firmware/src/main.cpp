#include <Arduino.h>
#include <Wire.h>

#include "config.h"

#include "logger.h"
#include "sensorApiService.h"
#include "wifiService.h"
#include "luxSensor.h"
#include "multiSensonr.h"
#include "uvSensor.h"

// VEML6075 (UV Sensor) @ 0x10
// BH1750 (Light Sensor) @ 0x23
// SI1145 (UV Sensor) @ 0x60 <-- DONT USE!
// BME680 () @ 0x76

WifiService wifiService;
SensorAPIService sensorAPIService;
LuxSensor luxSensor;
MultiSensor multiSensor;
UVSensor uvSensor;

void setup() {
  Serial.begin(115200);
  while (!Serial);

  Logger::info("test");

  Wire.begin();

  wifiService.begin(WIFI_SSID, WIFI_PASSWORD);
  sensorAPIService.begin(wifiService, SENSOR_API_URL);

  luxSensor.begin(Wire);
  multiSensor.begin(Wire);
  uvSensor.begin(Wire);
}


void loop() {
  luxSensor.loop();
  multiSensor.loop();
  uvSensor.loop();

  SensorReading sensorReading;
  sensorReading.batteryVoltage = "";
  sensorReading.externalTemp = "";
  sensorReading.humidity = "";
  sensorReading.internalTemp = "";
  sensorReading.lux = "";
  sensorReading.rainfall = "";
  sensorReading.recordedAt = "";
  sensorReading.solarVoltage = "";
  sensorReading.uva = "";
  sensorReading.uvb = "";
  sensorReading.uvIndex = "";
  sensorReading.windDirection = "";
  sensorReading.windSpeed = "";

  sensorAPIService.postSensorReading(sensorReading);

  delay(5000);
}
