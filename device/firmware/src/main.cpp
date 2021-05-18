#include <Arduino.h>
#include <Wire.h>

#include "config.h"

#include "wifiService.h"
#include "luxSensor.h"
#include "multiSensonr.h"
#include "uvSensor.h"

// VEML6075 (UV Sensor) @ 0x10
// BH1750 (Light Sensor) @ 0x23
// SI1145 (UV Sensor) @ 0x60 <-- DONT USE!
// BME680 () @ 0x76

WifiService wifiService;
LuxSensor luxSensor;
MultiSensor multiSensor;
UVSensor uvSensor;

void setup() {
  Serial.begin(115200);
  while (!Serial);

  Wire.begin();

  wifiService.begin(WIFI_SSID, WIFI_PASSWORD);
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
