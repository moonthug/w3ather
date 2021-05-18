#include <Arduino.h>
#include <WiFi.h>
#include <Wire.h>


#include "bh1750_sensor.h"
#include "bme680_sensor.h"
#include "veml6075_sensor.h"

// VEML6075 (UV Sensor) @ 0x10
// BH1750 (Light Sensor) @ 0x23
// SI1145 (UV Sensor) @ 0x60 <-- DONT USE!
// BME680 () @ 0x76

BH1750_Sensor luxSensor;
BME680_Sensor multiSensor;
VEML6075_Sensor uvSensor;

void setup() {
  Serial.begin(115200);
  while (!Serial);

  WiFi.begin(ssid, password);
  WiFi.setHostname("dr1nker");

  Wire.begin();

  luxSensor.begin(Wire);
  multiSensor.begin(Wire);
  uvSensor.begin(Wire);
}

void loop() {
  luxSensor.loop();
  multiSensor.loop();
  uvSensor.loop();

  delay(5000);
}
