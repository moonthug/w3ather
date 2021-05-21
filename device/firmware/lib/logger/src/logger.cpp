#include "logger.h"

Logger* Logger::instance = nullptr;

Logger::Logger() {}

Logger* Logger::getInstance() {
  if (instance == nullptr) {
    instance = new Logger();
  }

  return instance;
}

void Logger::debug(const char *message) { Logger::getInstance()->log("\033[34mdebug\033[0m", message); }
void Logger::info(const char *message) { Logger::getInstance()->log("\033[32minfo\033[0m", message); }
void Logger::warn(const char *message) { Logger::getInstance()->log("\033[33mwarn\033[0m", message); }
void Logger::error(const char *message) { Logger::getInstance()->log("\033[31merror\033[0m", message); }

Logger::~Logger() {}

void Logger::log(const char *level, const char *message) {
  char buffer[1024];
  strcpy(buffer, level);
  strcat(buffer, ": ");
  strcat(buffer, message);
  Serial.println(buffer);
}