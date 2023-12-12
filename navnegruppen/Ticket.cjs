const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  sender: { type: String, required: true },
  message: { type: String, required: true },
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
  },
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
});

const Ticket = mongoose.model('Ticket', ticketSchema, 'Ticket');

module.exports = Ticket;
