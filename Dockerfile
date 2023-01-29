FROM node:18-alpine
WORKDIR .
COPY . .
RUN yarn install --production
CMD ["node", "server.mjs"]
EXPOSE 3000
