FROM node:9

RUN npm install -g ionic@3.20.0
RUN apt-get update
RUN apt-get install vim -y
RUN apt-get install xdg-utils -y
RUN apt-get install w3m w3m-img -y

EXPOSE 8100
EXPOSE 35729

CMD ["sh", "/code/init.sh"]