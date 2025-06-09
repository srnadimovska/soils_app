const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path:`${__dirname}/config.env` });
const cors = require('cors');
const db = require('./pkg/db/index');
const jwt = require('express-jwt');

const { handleChatRequest} = require('./handler/aiController');
const soilHandler = require('./handler/soilHandler');
const auth = require('./handler/authHandler');
const crops = require('./handler/cropsHandler');
const fertilizerHandler = require('./handler/fertilizersHandler');

app.use(cors());

app.use(express.urlencoded({ extended : true }));
app.use(express.json());


app.set('view engine' , 'ejs');
app.use(express.static('public'));

db.init();

app.post('/api/v1/signup', auth.signup);
app.post('/api/v1/login', auth.login);

app.post('/api/v1/ai', handleChatRequest);

app.use(
  jwt
    .expressjwt({
      algorithms: ['HS256'],
      secret: process.env.JWT_SECRET,
      getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
        }
        if (req.cookies.jwt) {
          return req.cookies.jwt;
        }
        return null;
      },
    })
    .unless({
      path: ['/api/v1/signup', '/api/v1/login'],
    })
);



app.get('/api/v1/soil', soilHandler.getAllSoil);
app.get('/api/v1/soil/:id', soilHandler.getSoilById);
app.post('/api/v1/soil', soilHandler.createSoil);
app.patch('/api/v1/soil/:id', soilHandler.updateSoil);
app.delete('/api/v1/soil/:id', soilHandler.deleteSoil);
app.post('/api/v1/soil/samples', soilHandler.addSampleSoils);
app.post('/api/v1/soil/chat', soilHandler.chatAboutSoil);


app.post('/api/v1/crops', crops.createCrops);
app.get('/api/v1/crops', crops.getAllCrops);
app.post('/api/v1/crops/samples', crops.addSampleCrops);

app.post('/api/v1/fertilizers', fertilizerHandler.createFertilizers);
app.get('/api/v1/fertilizers', fertilizerHandler.getAllFertilizers);
app.post('/api/v1/fertilizers/samples', fertilizerHandler.addSampleFertilizers);



app.listen(process.env.PORT, (err) => {
    if(err) {
        return console.log('Service can not start');
    }
    console.log(`Service started successfully in port ${process.env.PORT}`);
});
