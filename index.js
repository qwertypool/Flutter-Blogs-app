const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.Port || 5000

mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology:true,

});

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("mongo db connected");
})
app.use(express.json())
const userRoute = require("./routes/user");
app.use('/user',userRoute);

app.route("/").get((req,response)=>response.json('helllooooo deeepaaaa 111'));
app.listen(port,()=>console.log("server is running ppl"))