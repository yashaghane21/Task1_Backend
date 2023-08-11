const mongoose = require("mongoose")

const Productschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
       
    }, 
    desc: {
        type: String,
        require: true
    },
    img: {
        type: String,
        required: true
    }
});

const product = mongoose.model("product", Productschema);
module.exports =product;
