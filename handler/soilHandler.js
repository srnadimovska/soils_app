const Soil = require('../pkg/model/soilModel');
const { chatWithAI} = require('./aiSystem');

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

 exports.chatAboutSoil = async (req, res) => {
  try {
    const soils = await Soil.find();

    const context = soils
      .map(
        (p) =>
          `Име: ${p.name}, Тип: ${p.type}, pH: ${p.ph},  Локација: ${p.location}}`
      )
      .join('\n');

    const systemMessage =
      'Ти си експерт за почви во Македонија. Користи ги следниве информации за да одговараш на прашања:';

    const fullPrompt = `${systemMessage}\n${context}\n\nПрањање: ${req.body.prompt}`;

    const aiResponse = await chatWithAI(fullPrompt);

    res.json(aiResponse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addSampleSoils = async (req, res) => {
  try {
    const sampleSoils = [
      {
        name: 'Црница',
        type: 'aluvijalna',
        ph: 6.8,
        location: 'Пелагонија',
        culture: ['пченица', 'јачмен', 'сончоглед'],
        
      },
      {
        name: 'Алувијална почва',
        type: 'pesok',
        ph: 7.2,
        location: 'Вардарска долина',
        culture: ['јаболка', 'пиперка', 'домати'],

        
      },
      {
        name: 'Рендзина',
        type: 'aluvijalna',
        ph: 7.5,
        location: 'Охридско-Преспански регион',
        culture: ['винова лоза', 'пченка'],
    
      },
      {
        name: 'Планинска почва',
        type: 'deluvijalna',
        ph: 5.8,
        location: 'Шар Планина',
        culture: ['детелина', 'ливадарка'],
        
      },
      {
        name: 'Глинеста почва',
        type: 'deluvijalna',
        ph: 6.2,
        location: 'Тиквешко',
        culture: ['грозје', 'краставици'],
        
      },
      {
        name: 'Песоклива почва',
        type: 'crvenica',
        ph: 7.0,
        location: 'Гевгелиско',
        culture: ['лубеница', 'диња'],
        
      },
      {
        name: 'Солончаци',
        type: 'deluvijalna',
        ph: 8.5,
        location: 'Кумановско',
        culture: ['јачмен', 'пченка'],
    
      },
      {
        name: 'Каменеста почва',
        type: 'aluvijalna',
        ph: 6.0,
        location: 'Крушевско',
        culture: ['бор', 'буква'],
        
      },
      {
        name: 'Иловица',
        type: 'humus',
        ph: 6.5,
        location: 'Струмичко',
        culture: ['домати', 'јагоди'],
    
      },
      {
        name: 'Планинска црница',
        type: 'deluvijalna',
        ph: 6.9,
        location: 'Маврово',
        culture: ['пченица', 'компир'],
        
      },
    ];

    const inserted = await Soil.insertMany(sampleSoils);
    res.status(201).json({
      message: 'Dodadeni pocvi',
      data: inserted,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

