FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 4300

CMD ["npm", "start"]