#include "wifiService.h"

WifiService::WifiService() {

}

void WifiService::begin(const char* wifiSsid, const char* wifiPassword) {
  WiFi.begin(wifiSsid, wifiPassword);
  WiFi.setHostname("w3ather");

  Serial.println("main: Connect to wifi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("main: waiting for connection...");
  }
  Serial.println("main: Wifi connected!");

//  Serial.println("main: Fetch Time");
//  configTime(0, 0, ntpServer);
//  setenv("TZ", timezoneInfo, 1);
//  tzset();
}