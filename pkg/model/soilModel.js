const mongoose = require('mongoose');

const soilSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vnesi ime!'],
        trim: true,
    },
    type: {
    type: String,
    enum: {
      values: ['aluvijalna', 'humus', 'deluvijalna', 'pesok', 'crvenica'],
      message: 'Типот `{VALUE}` не е дозволен!',
    },
    required: [true, 'Vnesi tip!'],
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
    culture: 
        [{ type: String}],
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Soil = mongoose.model('Soil', soilSchema);
module.exports = Soil;