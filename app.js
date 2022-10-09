const express = require("express");
const bodyParser = require("body-parser")
const app = express();
var cors = require('cors');
app.use(cors({origin: '*', credentials: true}));


const mongoose = require('mongoose')

mongoose.connect(
  `mongodb+srv://akhil:akhil@cluster0.o9rhqj3.mongodb.net/budget-expenses?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
})

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://akhil:akhil@cluster0.o9rhqj3.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("budget-monitoring").collection("expenses-data");

//   client.close();
// });

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb+srv://akhil:akhil@cluster0.o9rhqj3.mongodb.net/budget-expenses');
// }

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes/data'));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next()
})


app.listen(server_port, server_ip_address, function () {

    console.log( "Listening on " + server_ip_address + ", port " + server_port )
  
  });