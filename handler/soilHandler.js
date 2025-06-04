const Soil = require('../pkg/model/soilModel');

exports.createSoil = async(req,res) => {
    try {
        const newSoil = await Soil.create(req.body);
        res.status(201).json({
            status:'success',
            data: {
                newSoil,
            },
        });
    } catch(err) {
        res.status(500).json({
            status:'fail',
            message: err.message,
        });
    }
};

exports.getAllSoil = async(req,res) => {
    try {
        const soils = await Soil.find();
        res.status(200).json({
            status:'success',
            data: {
                soils,
            },
        });

    } catch(err) {
        res.status(500).json({
            status:'fail',
            message: err.message,
        });
    }
};

exports.getSoilById = async(req,res) => {
    try {
        const id = req.params.id;
        const soil = await Soil.findById(id);

        res.status(200).json({
            status:'success',
            data: {
                soil,
            },
        });
    } catch(err) {
        res.status(500).json({
            status:'fail',
            message: err.message,
        });
    }
};
 exports.updateSoil = async (req,res) => {
    try {
        const soil = await Soil.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status:'success',
            data: {
                soil,
            }
        });
    } catch(err) {
        res.status(500).json({
            status:'fail',
            message: err.message,
        });
    }
 };

 exports.deleteSoil = async(req,res) => {
    try {
        const soil = await Soil.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status:'success',
            data: {
                soil,
            }
        });

    } catch(err) {
        res.status(500).json({
            status:'fail',
            message: err.message,
        });
    }
 };
