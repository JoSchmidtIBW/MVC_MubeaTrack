import mariaDB from "mariadb";

console.log("bin lib/db");
const poolDB = mariaDB.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mubea2020!',
    database: 'mubeaVerkaufDataBase',
    connectionLimit: 5
});

export default poolDB;
//module.exports.default
//exports.default
//export default =

/*
let  poolDB = {
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
export default poolDB//Connection Pools with MariaDB Connector/Node.js (Promise API)

 */