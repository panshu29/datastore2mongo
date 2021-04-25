FROM node:12-slim
WORKDIR /usr/src/app
COPY . .

RUN npm install 


RUN chmod -R 775 /usr/src/app
RUN chown -R node:root /usr/src/app

EXPOSE 8081
USER 1000

CMD ["sh", "-c", "npm run app"]
