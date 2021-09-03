const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    fullname: {
        type: String,
        required: true
    }
}, { timestamps: false });

module.exports = model('User', userSchema);