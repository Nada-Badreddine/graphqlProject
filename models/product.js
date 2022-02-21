const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = new Schema({

 name: String,
 price: Number ,
 
  });

  module.exports = mongoose.model("Product", schema);