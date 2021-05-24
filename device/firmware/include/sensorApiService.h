#ifndef W3ATHER_SENSOR_API_SERVICE_H
#define W3ATHER_SENSOR_API_SERVICE_H

#include "esp_log.h"
#include <time.h>
#include "HTTPClient.h"
#include <ArduinoJson.h>

#include "sensor.h"
#include "wifiService.h"

class SensorAPIService {
private:
  const char* apiUrl;
  int post(const char* path, String body);

public:
  void begin(WifiService &wifiService, const char* apiUrl);
  bool postSensorReading(SensorReading sensorReading);
};


#endif //W3ATHER_SENSOR_API_SERVICE_H
