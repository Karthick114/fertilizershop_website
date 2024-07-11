const mongoose = require('mongoose');

// Define a schema for the category collection
const categorySchema = new mongoose.Schema({
  name :[String]
});

// Define the model for the category collection
const Categorys = mongoose.model('categorys', categorySchema);

module.exports = Categorys;

