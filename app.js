const express = require("express");
const connection = require("./src/databases/database");


const app = express();
connection;
// app.get("/", function (req, res) {
//     res.send("hello wolrd");
// })
app
    .use(express.json());
const employeerouter = require("./src/router/route");
app.use("/", employeerouter);

app.listen(8800, ()=> { console.log("server run on port 8800")})