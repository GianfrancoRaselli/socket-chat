const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  userFromId: {
    type: String,
    required: true
  },
  userToId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: false });

module.exports = model('Message', messageSchema);
