#ifndef W3ATHER_SENSOR_H
#define W3ATHER_SENSOR_H

#include "Wire.h"

struct SensorReading {
  float batteryPercent;
  float batteryVoltage;
  float dewPoint;
  float externalTemp;
  float heatIndex;
  float humidity;
  float internalTemp;
  float lux;
  float pressure;
  float rainfall;
  const char* recordedAt;
  float solarPercent;
  float solarVoltage;
  float uva;
  float uvb;
  float uvIndex;
  const char* windDirection;
  float windSpeed;

  const char* clientName;
  const char* clientVersion;
};

/**
 *
 */
class Sensor {
public:
  virtual bool read();
};

/**
 *
 */
class AnalogSensor: public Sensor {
private:
  gpio_num_t sensorPin;

public:
  void begin(gpio_num_t pin) {
    sensorPin = pin;
  }
};

/**
 *
 */
class I2CSensor: public Sensor {
public:
  virtual void begin(TwoWire &wire);
};

#endif //W3ATHER_SENSOR_H
