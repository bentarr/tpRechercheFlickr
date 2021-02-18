const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imagesSchema = new Schema({
  name: String,
  lien :String,
});

module.exports = mongoose.model('Images', imagesSchema);