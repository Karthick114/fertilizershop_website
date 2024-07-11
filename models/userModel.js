const mongoose = require('mongoose');

// Define a schema for the category collection
const userInfoSchema = new mongoose.Schema({
    email :{ type: String , required : true },
    pwd : {type : String , required : true},
    name : {type:String , required : true},
    role : {type:String, required : true}
});

// Define the model for the category collection
const UserInfo = mongoose.model('login_details', userInfoSchema);

module.exports = UserInfo;

