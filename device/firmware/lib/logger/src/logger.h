#ifndef MY_LOGGER_H
#define MY_LOGGER_H

#include <Arduino.h>

class Logger {
private:
  static Logger* instance;
  Logger();

public:
  static Logger *getInstance();

  static void debug(const char* message);
  static void info(const char* message);
  static void warn(const char* message);
  static void error(const char* message);

  ~Logger();

  void log(const char* level, const char* message);
};

#endif //MY_LOGGER_H
