FROM node:14-alpine

WORKDIR .

COPY package*.json ./

RUN npm i && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
