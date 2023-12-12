const mongoose = require('mongoose');
const { Schema } = mongoose;

// BoyName Schema
const boyNameSchema = new Schema({
  name: { type: String, required: true }
});
const BoyName = mongoose.model('BoyName', boyNameSchema);

// GirlName Schema
const girlNameSchema = new Schema({
  name: { type: String, required: true }
});
const GirlName = mongoose.model('GirlName', girlNameSchema);

// InternationalBoyName Schema
const internationalBoyNameSchema = new Schema({
  name: { type: String, required: true }
});
const InternationalBoyName = mongoose.model('InternationalBoyName', internationalBoyNameSchema);

// InternationalGirlName Schema
const internationalGirlNameSchema = new Schema({
  name: { type: String, required: true }
});
const InternationalGirlName = mongoose.model('InternationalGirlName', internationalGirlNameSchema);

// UnisexName Schema
const unisexNameSchema = new Schema({
  name: { type: String, required: true }
});
const UnisexName = mongoose.model('UnisexName', unisexNameSchema);

// Exporting the models
module.exports = {
  BoyName,
  GirlName,
  InternationalBoyName,
  InternationalGirlName,
  UnisexName
};
