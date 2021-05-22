#define DEVICE_NAME "branston_1"
#define HW_VERSION "0.1"

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
  sensorReading.batteryPercent = 100;
  sensorReading.batteryVoltage = 4.2;
  sensorReading.dewPoint = 1;
  sensorReading.externalTemp = 20;
  sensorReading.heatIndex = 1;
  sensorReading.humidity = 80;
  sensorReading.internalTemp = 20;
  sensorReading.lux = 30;
  sensorReading.rainfall = 0;
  sensorReading.recordedAt = "";
  sensorReading.solarVoltage = 7;
  sensorReading.uva = 1;
  sensorReading.uvb = 1;
  sensorReading.uvIndex = 1;
  sensorReading.windDirection = "NE";
  sensorReading.windSpeed = 0;
  sensorReading.clientName = DEVICE_NAME;
  sensorReading.clientVersion = HW_VERSION;

  sensorAPIService.postSensorReading(sensorReading);

  delay(5000);
}
