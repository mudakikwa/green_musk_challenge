#Dockerfile

FROM node:18-alpine AS green_musk_app

LABEL Developers="Mudakikwa Julio Fred"

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

RUN rm -rf src/ static/ emailTemplates/ docker-compose.yml

USER node:node

# CMD ["sleep","360000"]
CMD ["node","build/index.js"]