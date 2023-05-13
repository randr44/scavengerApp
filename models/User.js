const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    dateOfBirth: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;