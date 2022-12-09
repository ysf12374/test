FROM node:13.12.0-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

COPY . ./

EXPOSE 3000
CMD ["npm", "start"]
