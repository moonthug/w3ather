#ifndef W3ATHER_SENSOR_API_SERVICE_H
#define W3ATHER_SENSOR_API_SERVICE_H

#include "HTTPClient.h"

#include "logger.h"
#include "sensor.h"
#include "wifiService.h"

class SensorAPIService {
private:
  const char* apiUrl;
  int post(const char* path);

public:
  void begin(WifiService &wifiService, const char* apiUrl);
  bool postSensorReading(SensorReading sensorReading);
};


#endif //W3ATHER_SENSOR_API_SERVICE_H
