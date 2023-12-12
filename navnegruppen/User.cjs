const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    partner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to another User document
  },
  email: { type: String, required: true, unique: true },
  likedNames: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Name' }], // Array of ObjectIds referencing the Name model
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Name' }] // Array of ObjectIds referencing the Name model
});

const User = mongoose.model('User', userSchema, 'User');

module.exports = User;
