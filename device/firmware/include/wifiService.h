#ifndef W3ATHER_WIFISERVICE_H
#define W3ATHER_WIFISERVICE_H

#include <WiFi.h>

#include "logger.h"

class WifiService {
public:
  WifiService();
  void begin(const char* wifiSsid, const char* wifiPassword);
};


#endif //W3ATHER_WIFISERVICE_H