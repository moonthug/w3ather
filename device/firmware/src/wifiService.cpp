#include "wifiService.h"

WifiService::WifiService() {

}

void WifiService::begin(const char* wifiSsid, const char* wifiPassword) {
  WiFi.begin(wifiSsid, wifiPassword);
  WiFi.setHostname("w3ather");

  Logger::info("Connect to Wifi...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(2000);
    Logger::warn("Wifi connecting...");
  }

  Logger::info("Wifi connected");

//  Serial.println("main: Fetch Time");
//  configTime(0, 0, ntpServer);
//  setenv("TZ", timezoneInfo, 1);
//  tzset();
}