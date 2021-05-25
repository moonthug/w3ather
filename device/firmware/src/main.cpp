#define DEVICE_NAME "branston_1"
#define HW_VERSION "0.1"
#define SLEEP_DURATION 15

#define LOG_LOCAL_LEVEL ESP_LOG_VERBOSE

#include "Arduino.h"
#include "Wire.h"
#include "OneWire.h"
#include "esp_log.h"

#include "config.h"

#include "sensorApiService.h"
#include "wifiService.h"
#include "batterySensor.h"
#include "luxSensor.h"
#include "multiSensor.h"
#include "solarSensor.h"
#include "temperatureSensor.h"
#include "uvSensor.h"
#include "weatherUtils.h"

RTC_DATA_ATTR int bootCount = 0;

OneWire oneWire(ONE_WIRE_BUS);

WifiService wifiService;
SensorAPIService sensorAPIService;
BatterySensor batterySensor;
LuxSensor luxSensor;
MultiSensor multiSensor;
SolarSensor solarSensor;
TemperatureSensor temperatureSensor;
UVSensor uvSensor;

void setup() {
  Serial.begin(115200);
  while (!Serial);

  ++bootCount;
  ESP_LOGI("main", "Boot %i", bootCount);

  Wire.begin();

  wifiService.begin(WIFI_SSID, WIFI_PASSWORD);
  sensorAPIService.begin(wifiService, SENSOR_API_URL);

  batterySensor.begin(BATTERY_SENSOR_PIN);
  solarSensor.begin(SOLAR_SENSOR_PIN);

  temperatureSensor.begin(oneWire);

  luxSensor.begin(Wire);
  multiSensor.begin(Wire);
  uvSensor.begin(Wire);

  esp_sleep_enable_timer_wakeup(SLEEP_DURATION * 1000000);

  batterySensor.read();
  solarSensor.read();

  temperatureSensor.read();

  luxSensor.read() ? : ESP_LOGI("main", "Lux sensor read failed");
  multiSensor.read() ? : ESP_LOGI("main", "Multi sensor read failed");
  uvSensor.read() ? : ESP_LOGI("main", "Uv sensor read failed");

  SensorReading sensorReading;
  sensorReading.batteryPercent = batterySensor.batteryPercent;
  sensorReading.batteryVoltage = batterySensor.batteryVoltage;
  sensorReading.dewPoint = WeatherUtils::calculateDewPoint(multiSensor.temperature, multiSensor.humidity);
  sensorReading.externalTemp = temperatureSensor.temperature;
  sensorReading.heatIndex = WeatherUtils::calculateHeatIndex(multiSensor.temperature, multiSensor.humidity);
  sensorReading.humidity = multiSensor.humidity;
  sensorReading.internalTemp = multiSensor.temperature;
  sensorReading.lux = luxSensor.lux;
  sensorReading.pressure = multiSensor.pressure;
  sensorReading.rainfall = 0;
  sensorReading.solarPercent = solarSensor.solarPercent;
  sensorReading.solarVoltage = solarSensor.solarVoltage;
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
