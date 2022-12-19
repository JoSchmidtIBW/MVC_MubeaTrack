import express from "express";

const app = express();
const port = process.env.port || 7088;


//setup
app.set("case sensitive routing", false); // um url gross oder klein schreiben link /users   /Users
app.set("view engine", "ejs");


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use( express.static( "./public" ) );




app.get('/', (req, res) => {
    res.send('Hello World!');
});



console.log("ich bin server.mjs");


export default function sum(a, b) {
    return a + b;
}
console.log("sum: "+sum(4,3));

a_Plus_b(1,2);
function a_Plus_b(a,b){
    let result = a+b;
    console.log("a+b= "+ result);
}

app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
});
