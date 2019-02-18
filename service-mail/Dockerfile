FROM node:latest
USER root

RUN apt-get update
ADD files /files

RUN cd /files && npm i --only=production

CMD cd /files && npm start
EXPOSE 1031
