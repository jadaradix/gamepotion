FROM node:11.6.0
USER root

RUN apt-get update
ADD files /files

RUN cd /files && npm i --only=production

CMD cd /files && npm start
EXPOSE 1031
