const mongoose = require('mongoose');

// Product Schema..
const productSchema = new mongoose.Schema({
    imgurl :{ type: String , required : true },
    description : {type : String , required : true},
    name : {type:String , required : true},
    price : {type:String, required : true},
    offer : {type:String, required : true},
    category : {type:String, required : true}
  });

const Products = mongoose.model('products',productSchema);

module.exports = Products;