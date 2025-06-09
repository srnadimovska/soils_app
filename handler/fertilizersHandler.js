const Fertilizers = require('../pkg/model/fertilizers.js');

exports.createFertilizers = async (req,res) => {
    try{
        const fertilizers = new Fertilizers(req.body);
        await fertilizers.save();
        res.status(201).json(fertilizers);
    } catch(err) {
        res.status(500).json({
            error: err.message
        });
    }
};

exports.getAllFertilizers = async(req,res) => {
    try {
        const fertilizers = await Fertilizers.find();
        res.json(fertilizers);
    } catch(err) {
        res.status(500).json({
            error: err.message
        });
    }
};

exports.addSampleFertilizers = async (req, res) => {
  try {
    const sampleFertilizers = [
      {
        name: "Urea",
        type: "Nitrogen-based",
        usage: "Used to promote leafy growth in early plant development",
        composition: "46% Nitrogen",
        quantity: "50kg",
      },
      {
        name: "Superphosphate",
        type: "Phosphorus-based",
        usage: "Stimulates root development and flowering",
        composition: "20% Phosphorus",
        quantity: "25kg",
      },
      {
        name: "Potassium Chloride",
        type: "Potassium-based",
        usage: "Improves fruit quality and disease resistance",
        composition: "60% Potassium",
        quantity: "25kg",
      },
      {
        name: "NPK 15-15-15",
        type: "Compound",
        usage: "General purpose fertilizer for balanced growth",
        composition: "15% N, 15% P, 15% K",
        quantity: "50kg",
      },
      {
        name: "Ammonium Nitrate",
        type: "Nitrogen-based",
        usage: "Used for cereals like wheat and corn",
        composition: "34% Nitrogen",
        quantity: "25kg",
      },
      
    ];

    const inserted = await Fertilizers.insertMany(sampleFertilizers);
    res.status(201).json({
        message:'Dodadeni gjubriva',
        data: inserted,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};