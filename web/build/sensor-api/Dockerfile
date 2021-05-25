# Context is the lerna root directory (:!

#
# Base Node
FROM mhart/alpine-node:12 AS base
RUN apk update
RUN apk add --no-cache tini jq
WORKDIR /opt/app
ENTRYPOINT ["/sbin/tini", "--"]
COPY ./packages/sensor-api/package*.json ./

#
# Global Dependencies (Lerna)
FROM base AS global_dependencies
COPY package*.json ./
RUN npm set progress=false
RUN npm install

#
# Dependencies
FROM base AS local_dependencies
COPY ./packages/sensor-api/package*.json ./
RUN npm set progress=false
RUN npm install --only=production
RUN cp -R node_modules prod_node_modules
RUN npm ci


#
# Build
FROM base AS build
COPY --from=global_dependencies /opt/app/node_modules ./node_modules
COPY --from=local_dependencies /opt/app/node_modules ./node_modules
COPY ./packages/sensor-api .
COPY ./tsconfig.json /
RUN npm run build

#
# Test
#FROM dependencies AS test
#COPY . .
#RUN npm run lint && npm run test

#
# Release
FROM base AS release
COPY --from=local_dependencies /opt/app/prod_node_modules ./node_modules
COPY --from=build /opt/app/dist ./dist
EXPOSE 3000
CMD npm run start
