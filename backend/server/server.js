var express = require('express');
var mongoose = require('mongoose');

const router = express.Router();

const Images = require('../models/images');

const port = 7000;
const local_db = "mongodb://localhost:27017/bddTp";

mongoose.connect(local_db, function (err){
  if(err){ console.error("Erreur" + err); }
  else { console.log('Connecté en local à mongo.'); }
});		

router.get('/photos/:name', function (req,res){
    console.log('Liste photos');
    Images.find({name: req.params.name}).exec(function (err, images){
      if(err) {
        console.log("Les photos ne peuvent pas s'afficher");
      }else{ res.json(images);
      console.log(images);}
      }
    );
});


router.post('/photos', function (req, res){
    console.log("Les photos sont en cours de téléchargement");
    var images = new Images();
    images.name = req.body.name;
    images.lien = req.body.lien;
    images.save(function (err, imagesSave){
        if(err){
          console.log("Les photos ne peuvent pas s'enregistrer");
        }
        else{
          res.json(imagesSave);
          console.log("Les photos ont bien été enregistrées");
        }
      }
    );
});

// Tentative  Création système suppression doublon en bdd

/* Tentative de création du système permettant d'éviter les doublons de mot de clé dans la collection Mongo

app.get("/photos/:name", async (req, res) => {
  await Image.find({ tag: req.params.tag }, (err, images) => {
    if (err) { console.log(err); }
    else { res.json(images); }
  });
});

app.delete("/photos/:name", async (req, res) => {
  await Image.deleteOne({ tag: req.params.tag }, (err, images) => {
    if (err) { console.log(err); }
  });
});
*/
module.exports = router;