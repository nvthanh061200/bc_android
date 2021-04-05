const express = require('express');
const path = require('path');
const bodyParser= require("body-parser");
const app=express();
const port=process.env.PORT||3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})
const db = require('./config/connect');
db.connect(); 
const routes=require("./routes");
routes(app);

app.listen(port,()=>{
    console.log("listening on port " + port);
});

