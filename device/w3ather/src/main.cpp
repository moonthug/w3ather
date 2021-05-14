#include <Arduino.h>
#include <Wire.h>


#include "bh1750_sensor.h"
#include "bme680_sensor.h"
#include "veml6075_sensor.h"

// VEML6075 (UV Sensor) @ 0x10
// BH1750 (Light Sensor) @ 0x23
// SI1145 (UV Sensor) @ 0x60 <-- DONT USE!
// BME680 () @ 0x76

BH1750_Sensor bh1750;
BME680_Sensor bme680;
VEML6075_Sensor veml6075;

void setup() {
  Serial.begin(115200);
  while (!Serial);
  Serial.println("Start!");

  Wire.begin();

  bh1750.begin(Wire);
  bme680.begin(Wire);
  veml6075.begin(Wire);
}

void loop() {
  bh1750.loop();
  bme680.loop();
  veml6075.loop();
}
