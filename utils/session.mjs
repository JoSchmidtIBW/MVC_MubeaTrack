// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

var date = new Date();
date.setTime(date.getTime() + (2 * 1000)); //add 30s to current date-time 1s = 1000ms

let  session2 = ({
    secret: "Shh, its a secret!",//"thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: date },
    resave: false
})

export default session2