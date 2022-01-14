FROM node:16-alpine3.12

RUN apk update
RUN apk add vim

COPY /src /opt/app

CMD ["node", "/opt/app/index.js"]