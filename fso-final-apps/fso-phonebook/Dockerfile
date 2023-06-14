# Docker image artifact for fso-phonebook-fullstack app
FROM node:18-bullseye-slim AS base
WORKDIR /usr/src/app
COPY package*.json .

FROM base AS frontend-build
RUN npm i
COPY webpack* babel* ./
COPY ./client ./client
# ENV REACT_APP_BACKEND_URL=http://localhost:8080
RUN npm run build

FROM base AS start
RUN npm ci --only=production
COPY --from=frontend-build /usr/src/app/dist ./dist
COPY ./server ./server
COPY --chown=node index.js ./

ENV NODE_ENV=production
USER node
CMD ["npm", "run", "start-prod"]
