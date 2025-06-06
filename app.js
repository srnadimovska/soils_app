const express = require('express');
const app = express();
const db = require('./pkg/db/index');
const jwt = require('express-jwt');

const soilHandler = require('./handler/soilHandler');
const auth = require('./handler/authHandler');


app.use(express.urlencoded({ extended : true }));
app.use(express.json());


app.set('view engine' , 'ejs');
app.use(express.static('public'));

db.init();

app.post('/api/v1/signup', auth.signup);
app.post('/api/v1/login', auth.login);

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
      path: ['/api/v1/signup', '/api/v1/login',],
    })
);



app.get('/api/v1/soil', soilHandler.getAllSoil);
app.get('/api/v1/soil/:id', soilHandler.getSoilById);
app.post('/api/v1/soil', soilHandler.createSoil);
app.patch('/api/v1/soil/:id', soilHandler.updateSoil);
app.delete('/api/v1/soil/:id', soilHandler.deleteSoil);


app.listen(process.env.PORT, (err) => {
    if(err) {
        return console.log('Service can not start');
    }
    console.log(`Service started successfully in port ${process.env.PORT}`);
});
