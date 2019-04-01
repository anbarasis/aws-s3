From node:8

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY src ./src
COPY unit_test ./unit_test
COPY index.js ./

EXPOSE 8000

CMD node index.js