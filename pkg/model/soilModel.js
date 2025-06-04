const mongoose = require('mongoose');

const soilSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vnesi ime!'],
        trim: true,
    },
    type: {
        type: String,
        required: [true, 'Vnesi tip!'],
        enum: ['glina','pesok','humus','podvodna','deluvijalna','aluvijalna','crvenica','smolnica'],
        default: 'drugo',
    },
    ph: {
        type: Number,
        min:[0,'ph ne moze da e ponisko od 0!'],
        max: [14, 'ph ne moze da e povisoko od 14!'],
        required: [true, 'ph vrednosta e zadolzitelna!'],
    },
    location: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Soil = mongoose.model('Soil', soilSchema);
module.exports = Soil;