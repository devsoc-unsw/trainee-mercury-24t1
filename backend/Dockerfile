FROM --platform=linux/amd64 node:21-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM --platform=linux/amd64 node:21-alpine AS production

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --only=production
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]