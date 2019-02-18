FROM node:11.10.0
USER root

RUN apt-get update
ADD files /files

RUN cd /files && npm i --only=production

RUN cd /files/abstractions/api && npm i --only=production
RUN cd /files/abstractions/datalayer && npm i --only=production
RUN cd /files/abstractions/storage && npm i --only=production
RUN cd /files/abstractions/uuid && npm i --only=production

RUN cd /files/classes && npm i

CMD cd /files && npm run start-production
EXPOSE 1026
