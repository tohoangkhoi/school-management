FROM node:18-alpine

RUN mkdir -p /app/src

WORKDIR /app/src

COPY package.json .

RUN npm install

COPY . .

ENV CLIENT_DOMAIN = localhost
ENV DB_HOST=ep-late-boat-63999583.ap-southeast-1.aws.neon.tech
ENV DB_PORT=5432
ENV DB_USERNAME=tohoangkhoi
ENV DB_PASSWORD=YJkr8gOvGL0j
ENV DB_DATABASE=small-erb-db

ENV ACCESS_TOKEN_PRIVATE_KEY = YWNjZXNzLXRva2VuLXByaXZhdGUta2V5
ENV REFRESH_TOKEN_PRIVATE_KEY = cmVmcmVzaC10b2tlbi1wcml2YXRlLWtleQ
EXPOSE 8080

CMD ["npm", "start"]
