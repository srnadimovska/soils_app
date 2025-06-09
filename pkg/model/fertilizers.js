const mongoose = require('mongoose');

const fertilizersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  usage: { type: String, required: true },
  composition: { type: String },        
  quantity: { type: String },           
  dateOfAdd: { type: Date, default: Date.now },
});

const Fertilizers = mongoose.model('Fertilizers', fertilizersSchema);
module.exports = Fertilizers;