FROM node:18-alpine
WORKDIR .
COPY . .
RUN yarn install --production
CMD ["node", "server.mjs"]
EXPOSE 3000
#DB ist nicht installiert, ev mitgeben?????
# ev docker plugin compose --> docker copose up --> schreiben eine yaml-datei......

# immerhin platz auf Laufwerk c, weil docker ist nun in D :)