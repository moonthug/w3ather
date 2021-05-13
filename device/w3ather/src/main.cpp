#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include "bsec.h"
#include "Adafruit_SI1145.h"
#include "Adafruit_VEML6075.h"
#include "BH1750.h"

// VEML6075 () @ 0x10
// BH1750 (Light Sensor) @ 0x23
// SI1145 (UV Sensor) @ 0x60
// BME680 () @ 0x76

#define SEALEVELPRESSURE_HPA (1013.25)

Bsec iaqSensor;


// Helper functions declarations
void checkIaqSensorStatus(void);

void setup() {
  
  Serial.begin(115200);
  while (!Serial);
  Serial.println("Start!");

  Wire.begin();

  //
  // BME
  iaqSensor.begin(BME680_I2C_ADDR_PRIMARY, Wire);
  Serial.println("SEC library version " + String(iaqSensor.version.major) + "." + String(iaqSensor.version.minor) + "." + String(iaqSensor.version.major_bugfix) + "." + String(iaqSensor.version.minor_bugfix));
  checkIaqSensorStatus();

  bsec_virtual_sensor_t sensorList[10] = {
    BSEC_OUTPUT_RAW_TEMPERATURE,
    BSEC_OUTPUT_RAW_PRESSURE,
    BSEC_OUTPUT_RAW_HUMIDITY,
    BSEC_OUTPUT_RAW_GAS,
    BSEC_OUTPUT_IAQ,
    BSEC_OUTPUT_STATIC_IAQ,
    BSEC_OUTPUT_CO2_EQUIVALENT,
    BSEC_OUTPUT_BREATH_VOC_EQUIVALENT,
    BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_TEMPERATURE,
    BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_HUMIDITY,
  };

  iaqSensor.updateSubscription(sensorList, 10, BSEC_SAMPLE_RATE_LP);
  checkIaqSensorStatus();

  // Print the header
  Serial.println("Timestamp [ms], raw temperature [°C], pressure [hPa], raw relative humidity [%], gas [Ohm], IAQ, IAQ accuracy, temperature [°C], relative humidity [%], Static IAQ, CO2 equivalent, breath VOC equivalent");
}

void loop() {
  unsigned long time_trigger = millis();
  if (iaqSensor.run()) { // If new data is available
    Serial.print(String(time_trigger));
    Serial.print(", " + String(iaqSensor.rawTemperature));
    Serial.print(", " + String(iaqSensor.pressure));
    Serial.print(", " + String(iaqSensor.rawHumidity));
    Serial.print(", " + String(iaqSensor.gasResistance));
    Serial.print(", " + String(iaqSensor.iaq));
    Serial.print(", " + String(iaqSensor.iaqAccuracy));
    Serial.print(", " + String(iaqSensor.temperature));
    Serial.print(", " + String(iaqSensor.humidity));
    Serial.print(", " + String(iaqSensor.staticIaq));
    Serial.print(", " + String(iaqSensor.co2Equivalent));
    Serial.println(", " + String(iaqSensor.breathVocEquivalent));
    checkIaqSensorStatus();
  }
}

void checkIaqSensorStatus(void) {
  if (iaqSensor.status != BSEC_OK) {
    if (iaqSensor.status < BSEC_OK) {
      Serial.println("BSEC error code : " + String(iaqSensor.status));
    } else {
      Serial.println("BSEC warning code : " + String(iaqSensor.status));
    }
  }

  if (iaqSensor.bme680Status != BME680_OK) {
    if (iaqSensor.bme680Status < BME680_OK) {
      Serial.println("BME680 error code : " + String(iaqSensor.bme680Status));
    } else {
      Serial.println("BME680 warning code : " + String(iaqSensor.bme680Status));
    }
  }
}