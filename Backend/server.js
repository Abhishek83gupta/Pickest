const express = require("express");
require('dotenv').config()
const { readdirSync } = require("fs");   
const cors = require("cors")

const { connectDB } = require("./Database/dbConnection");


connectDB();
const app = express();

//Middleware
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 5000 ;
app.get("/",(req,res)=>{
    res.send("<h1> Hello bro </h1>")
})

// const authRoutes = require("./routes/authRoutes")
// app.use("/api", authRoutes)
// readdirSync --> reads the directory  
// console.log(readdirSync("./routes")) // In array form    
// importing and using routes dynamically       
readdirSync("./routes").map((route)=>
  app.use("/api",require(`./routes/${route}`))
)


app.listen(PORT,(req,res)=>{
  console.log(`Server is running on port ${PORT}`);
})