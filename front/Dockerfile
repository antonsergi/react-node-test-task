FROM node:18

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

CMD ["npm", "run", "dev"]
