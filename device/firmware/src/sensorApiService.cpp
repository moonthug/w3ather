#include "sensorApiService.h"

void SensorAPIService::begin(WifiService &wifiService, const char* apiUrl) {
  this->apiUrl = apiUrl;
}

int SensorAPIService::post(const char* path) {
  HTTPClient http;

  char url[255];
  strcpy(url, this->apiUrl);
  strcat(url, path);

  Logger::debug("Fetch url")
  Logger::debug(url);

  http.begin(url);
  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.POST(R"({
    "batteryVoltage": 1,
    "externalTemp": 1,
    "humidity": 1,
    "internalTemp": 2},
    "lux":  5,
    "rainfall":  0,
    "recordedAt": "0",
    "solarVoltage": 7,
    "uva":  0,
    "uvb":  0,
    "uvIndex":  0,
    "windDirection": "NW",
    "windSpeed": 0
  })");

  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);

  return httpResponseCode == 200;
}

bool SensorAPIService::postSensorReading(SensorReading sensorReading) {
  return this->post("/reading");
}