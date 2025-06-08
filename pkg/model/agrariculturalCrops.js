const mongoose = require('mongoose');

const cropsSchema = new mongoose.Schema({
    name: { type : String},
    type: { type: String},
    location: {type: String},
    dateOfAdd: { type: Date, default: Date.now},
});

const Crops = mongoose.model('Crops', cropsSchema);
module.export = Crops;