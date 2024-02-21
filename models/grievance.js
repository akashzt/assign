const mongoose = require('mongoose');

const grievanceSchema = mongoose.Schema({
  userId: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true 
    },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved'],
    default: 'open' 
    },
  details: { 
    type: String, 
    required: true 
    },
  timestamp: { 
    type: Date,
    default: Date.now 
    }
});

module.exports = mongoose.model('Grievance', grievanceSchema);