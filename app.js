const express = require("express");
const bodyParser = require("body-parser")
const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes/data'));

app.listen(PORT, ()=>{
    console.log('Server is running at ' + PORT)
})