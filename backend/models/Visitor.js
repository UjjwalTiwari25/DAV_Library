const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Make sure the model is registered with the correct name
const Visitor = mongoose.model('Visitor', visitorSchema);

// Add this to debug
console.log('Visitor model registered with collection:', Visitor.collection.name);

module.exports = Visitor; 