#include "wifiService.h"

WifiService::WifiService() {

}

void WifiService::begin(const char* wifiSsid, const char* wifiPassword) {
  WiFi.begin(wifiSsid, wifiPassword);
  WiFi.setHostname("w3ather");

  ESP_LOGI("wifi_service", "Connect to Wifi...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(2000);
    ESP_LOGW("wifi_service", "Wifi connecting...");
  }

  ESP_LOGI("wifi_service", "Wifi connected");

  ESP_LOGI("wifi_service", "Fetch time...");
  const char* ntpServer = "192.168.1.50";
  const char* timezoneInfo = "GMT+0BST-1,M3.5.0/01:00:00,M10.5.0/02:00:00";

  configTime(0, 0, ntpServer);
  setenv("TZ", timezoneInfo, 1);
  tzset();
}