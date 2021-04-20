# w3ather [backend]

## Project
- ##### [`packages/sensor-api`](backend/packages/sensor-api)
  - REST API for the weather station (Koa)
  - Scheduled weather importer (openweather)
- ##### [`packages/web-api`](backend/packages/web-api)
  - REST API for the frontend (AWS API Gateway/Lambda)
  - Serverless project
- ##### [`packages/db`](backend/packages/db)
  - Shared models and connection helpers 

### `@TODO`
- Docker deploy from Lerna is a tad yukky atm
