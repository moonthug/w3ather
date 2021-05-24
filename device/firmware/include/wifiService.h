#ifndef W3ATHER_WIFISERVICE_H
#define W3ATHER_WIFISERVICE_H

#include "esp_log.h"
#include <WiFi.h>

class WifiService {
public:
  WifiService();
  void begin(const char* wifiSsid, const char* wifiPassword);
};


#endif //W3ATHER_WIFISERVICE_H
