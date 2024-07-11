const mongoose = require('mongoose');

// Product Schema..
const orderSchema = new mongoose.Schema({
    userid :{ type: String , required : true },
    username : {type : String , required : true},
    phoneNo : {type:String , required : true},
    Address : {type:String, required : true},
    productId : {type:String, required : true},
    status : {type:String, required : true},
    isDone : {type:String, required : true},
    Quantity : {type:String, required : true},
    orderTime : {type:String, required: true},
    orderPrice : {type:String, required:true}
  });

const Orders = mongoose.model('Orders',orderSchema);

module.exports = Orders;