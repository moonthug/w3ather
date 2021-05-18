#ifndef W3ATHER_SENSOR_API_SERVICE_H
#define W3ATHER_SENSOR_API_SERVICE_H

#include "wifiService.h"

class SensorAPIService {
private:
  const char* api_url;

public:
  SensorAPIService(const char* api_url);
  void begin(WifiService &wifiService);

  void push_sensor_results();
};


#endif //W3ATHER_SENSOR_API_SERVICE_H
