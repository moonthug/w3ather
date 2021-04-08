# w3ather

A weather station, aggregator and frontend to show the weather in Branston, Leicestershire.


## Project

- #### [`backend`](backend)
  - Lerna mono repo
    - ##### [`packages/sensor-api`](backend/packages/sensor-api)
      - REST API for the weather station (Koa)
      - Scheduled weather importer (openweather)
    - ##### [`packages/web-api`](backend/packages/web-api)
      - REST API for the frontend (AWS API Gateway/Lambda)
      - Serverless project
    - ##### [`packages/db`](backend/packages/db)
      - Shared models and connection helpers 

- #### [`device`](device)
  - ##### [`w3ather`](device/w3ather)
    - PlatformIO project
    - ESP32 Arduino code
  - ##### [`pcb`](device/pcb)
    - PCB designs
  - ##### [`parts`](device/parts)
    - 3D Printed parts
    
- #### [`web`](web)
  - React Frontend (create-react-app)
