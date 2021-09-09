const express = require("express");
const router = require('./routes')
const app = express();

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') })



const connectDB = require('./config/connection');
connectDB();

app.use(express.json());
app.use(express.urlencoded({
	extended: true,
}));


app.use("/",router);
const port = process.env.PORT || 8080;

app.listen(port,() =>{
    console.log("Listening on PORT " +  port);
});