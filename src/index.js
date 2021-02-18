var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

const server = require('../backend/server/server');

const port = 7000;


app.use(function (req, res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})


app.use(express.static(path.join(__dirname, 'dist')));


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/server', server);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'/index.html'));

});

app.listen(port,function (){
  console.log("Serveur en écoute sur le port : " + port);
});