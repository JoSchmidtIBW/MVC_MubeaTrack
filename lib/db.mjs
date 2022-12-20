import mariaDB from "mariadb";

console.log("bin lib/db");
const pool = mariaDB.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mubea2020!',
    database: 'mubeaVerkaufDataBase',
    connectionLimit: 2
});

//export default pool;
//module.exports.default
//exports.default
//export default =

  let  poool = {
    getConnection() {
        return new Promise(function (res, rej) {
            pool.getConnection()
                .then(function (conn) {
                    res(conn);
                })
                .catch(function (error) {
                    rej(error);
                });
        });
    }
};
export default poool//Connection Pools with MariaDB Connector/Node.js (Promise API)
//-----------------------------------
/*
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = {
  getConnection() {
    return new Promise(function (res, rej) {
      pool.getConnection()
        .then(function (conn) {
          res(conn);
        })
        .catch(function (error) {
          rej(error);
        });
    });
  }
};
 */
