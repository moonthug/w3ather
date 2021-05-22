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

  Logger::info("Fetch time...");

  const char* ntpServer = "uk.pool.ntp.org";
  const char* timezoneInfo = "GMT+0BST-1,M3.5.0/01:00:00,M10.5.0/02:00:00";

  configTime(0, 0, ntpServer);
  setenv("TZ", timezoneInfo, 1);
  tzset();
}