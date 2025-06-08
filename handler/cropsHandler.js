const Crops = require('../pkg/model/agrariculturalCrops');

exports.createCrops = async (req,res) => {
    try{
        const crops = new Crops(req.body);
        await crops.save();
        res.status(201).json(crops);
    } catch(err) {
        res.status(500).json({
            error: err.message
        });
    }
};

exports.getAllCrops = async(req,res) => {
    try {
        const crops = await Crops.find();
        res.json(crops);
    } catch(err) {
        res.status(500).json({
            error: err.message
        });
    }
};

exports.addSampleCrops = async (req, res) => {
  try {
    const sampleCrops = [
      {
        name: "Пченица",
        type: "Житна култура",
        location: "Пелагонија",
      },
      {
        name: "Јачмен",
        type: "Житна култура",
        location: "Кумановско Поле",
      },
      {
        name: "Кукуруз",
        type: "Житна култура",
        location: "Тиквешко",
      },
      {
        name: "Компир",
        type: "Коренеста култура",
        location: "Крушевско",
      },
      {
        name: "Домат",
        type: "Зеленчук",
        location: "Струмичко",
      },
      {
        name: "Краставица",
        type: "Зеленчук",
        location: "Гевгелиско",
      },
      {
        name: "Јаболко",
        type: "Овошје",
        location: "Преспа",
      },
      {
        name: "Лубеница",
        type: "Овошје",
        location: "Валандовско",
      },
      {
        name: "Винова лоза",
        type: "Овошје (лозарство)",
        location: "Кавадарци",
      },
      {
        name: "Сончоглед",
        type: "Маслодајна култура",
        location: "Светиниколско",
      },
    ];

    const inserted = await Crops.insertMany(sampleCrops);
    res.status(201).json({
        message:'Dodadeni zemjodelski kulturi',
        data: inserted,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};