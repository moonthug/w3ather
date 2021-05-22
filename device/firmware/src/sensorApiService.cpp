#include "sensorApiService.h"

void SensorAPIService::begin(WifiService &wifiService, const char* apiUrl) {
  this->apiUrl = apiUrl;
}

int SensorAPIService::post(const char* path, String body) {
  HTTPClient http;

  char url[255];
  strcpy(url, this->apiUrl);
  strcat(url, path);

  Logger::debug("Fetch url");
  Logger::debug(url);

  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(body);

  if (httpResponseCode >= 200 && httpResponseCode < 300 ) {
    Logger::info("Request succeeded");
    return true;
  }

  char httpResponseCodeStr[3];
  itoa(httpResponseCode, httpResponseCodeStr, 10);

  Logger::error("Request failed:");
  Logger::error(httpResponseCodeStr);

  return false;
}

bool SensorAPIService::postSensorReading(SensorReading sensorReading) {
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){
    Logger::error("Failed to obtain time");
    return false;
  }

  char recordedAt [80];
  strftime(recordedAt, 80 , "%FT%TZ", &timeinfo);

  DynamicJsonDocument doc(1024);

  doc["recordedAt"] = recordedAt;
  doc["batteryPercent"] = sensorReading.batteryPercent;
  doc["batteryVoltage"] = sensorReading.batteryVoltage;
  doc["dewPoint"] = sensorReading.dewPoint;
  doc["externalTemp"] = sensorReading.externalTemp;
  doc["heatIndex"] = sensorReading.heatIndex;
  doc["humidity"] = sensorReading.humidity;
  doc["internalTemp"] = sensorReading.internalTemp;
  doc["lux"] = sensorReading.lux;
  doc["rainfall"] = sensorReading.rainfall;
  doc["solarVoltage"] = sensorReading.solarVoltage;
  doc["uva"] = sensorReading.uva;
  doc["uvb"] = sensorReading.uvb;
  doc["uvIndex"] = sensorReading.uvIndex;
  doc["windDirection"] = sensorReading.windDirection;
  doc["windSpeed"] = sensorReading.windSpeed;
  doc["clientName"] = sensorReading.clientName;
  doc["clientVersion"] = sensorReading.clientVersion;

  String output;
  serializeJson(doc, output);

  return this->post("/reading", output);
}