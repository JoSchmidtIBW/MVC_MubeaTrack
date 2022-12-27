# MubeaTrack - MongoDB

## Project Setup
### Server
```
npm install
```

Frameworks:
`npm install express` a Node.js web application framework
`npm install mariadb` the NodeJS MariaDB Connector
`npm install mocha` a testing library for Node. js
`npm install ejs`  weil man da auch antworten vom server schreiben kann, im html
// ev socket io oder websocketio für antworten von server und client
`npm i nodemon` damit beim Entwickeln der Server nicht immer neugestartet werden muss
`npm i crypto-js` für pw verschlüsseln
// ev helmet installieren
// ev fetch... für juck norris witz
`npm install dotenv --save` für passwort, und KEY für hashcode
npm install body-parser
`npm install --save express-session`
`npm install  cookie-parser`

start server with `npm run dev` --> start with nodemon (server start automatically, when do some code- changes)

or

start server with `node server.js`
or
start serve with `npm run start`

close server with ctrl+c



# Unit-Tests
start tests with `npm run test`
mit script mocha, nur noch --> `npm test`
nicht gleichzeitig server und test starten 6666666888999