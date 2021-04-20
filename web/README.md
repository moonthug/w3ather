# w3ather [backend]

## Project
- ##### [`packages/web`](web/packages/web)
    - React Frontend (create-react-app)
- ##### [`packages/sensor-api`](web/packages/sensor-api)
  - REST API for the weather station (Koa)
  - Scheduled weather importer (openweather)
- ##### [`packages/web-api`](web/packages/web-api)
  - REST API for the frontend (AWS API Gateway/Lambda)
  - Serverless project
- ##### [`packages/db`](web/packages/db)
  - Shared models and connection helpers 

### `@TODO`
- Docker deploy from Lerna is a tad yukky atm
