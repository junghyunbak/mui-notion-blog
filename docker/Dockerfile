FROM node:18.17.0

ENV TZ=Asia/Seoul

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

COPY ../ ./

RUN npm install

RUN npm run build

EXPOSE 3007

CMD [ "npm", "start" ]