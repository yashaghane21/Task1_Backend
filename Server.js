const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors")
app.use(express.json());
app.use(cors());


const auth = require("./Routers/Auth")
const product =require("./Routers/products")
const user =require("./Routers/user")
const cart= require("./Routers/Cart")
app.use("/api/v1/", auth)
app.use("/api/v2/", product)
app.use("/api/v3/", user)
app.use("/api/v4/",cart)


mongoose.set('strictQuery', false);
var mongoDB = "mongodb+srv://bytedevs2121:YFPAWrCjtJETwppp@cluster0.ji6l9ej.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("coonection succsess");
}).catch((e) => {
    console.log(e);
});


app.listen(5000, () => {
    console.log("Server is running");
})