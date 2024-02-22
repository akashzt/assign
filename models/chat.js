const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  grievanceId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grievance', 
    required: true 
 },
  senderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
 },
  createdAt: { 
    type: Date, 
    default: Date.now 
}
});

module.exports = mongoose.model('Chat', chatSchema);
