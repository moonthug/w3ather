#define DEVICE_NAME "branston_1"
#define HW_VERSION "0.1"
#define SLEEP_DURATION 15

#define LOG_LOCAL_LEVEL ESP_LOG_VERBOSE

#include "Arduino.h"
#include "Wire.h"
#include "esp_log.h"

#include "config.h"

#include "sensorApiService.h"
#include "wifiService.h"
#include "luxSensor.h"
#include "multiSensor.h"
#include "uvSensor.h"

RTC_DATA_ATTR int bootCount = 0;

WifiService wifiService;
SensorAPIService sensorAPIService;
LuxSensor luxSensor;
MultiSensor multiSensor;
UVSensor uvSensor;

void setup() {
  Serial.begin(115200);
  while (!Serial);

  ++bootCount;
  ESP_LOGI("main", "Boot %i", bootCount);

  Wire.begin();

  wifiService.begin(WIFI_SSID, WIFI_PASSWORD);
  sensorAPIService.begin(wifiService, SENSOR_API_URL);

  luxSensor.begin(Wire);
  multiSensor.begin(Wire);
  uvSensor.begin(Wire);

  esp_sleep_enable_timer_wakeup(SLEEP_DURATION * 1000000);

  luxSensor.loop();
  multiSensor.loop();
  uvSensor.loop();

  SensorReading sensorReading;
  sensorReading.batteryPercent = 100;
  sensorReading.batteryVoltage = 4.2;
  sensorReading.dewPoint = 1;
  sensorReading.externalTemp = 20;
  sensorReading.heatIndex = 1;
  sensorReading.humidity = multiSensor.humidity;
  sensorReading.internalTemp = multiSensor.temperature;
  sensorReading.lux = luxSensor.lux;
  sensorReading.rainfall = 0;
  sensorReading.solarVoltage = 7;
  sensorReading.uva = uvSensor.uva;
  sensorReading.uvb = uvSensor.uvb;
  sensorReading.uvIndex = uvSensor.uvIndex;
  sensorReading.windDirection = "NE";
  sensorReading.windSpeed = 0;
  sensorReading.clientName = DEVICE_NAME;
  sensorReading.clientVersion = HW_VERSION;

  sensorAPIService.postSensorReading(sensorReading);

  ESP_LOGI("main", "Sleep");
  esp_deep_sleep_start();
}


void loop() {

}
