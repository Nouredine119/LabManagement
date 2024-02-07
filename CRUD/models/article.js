const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    title,
    authors, //Tab name
    journal,
    volume,
    number,
    pages,//string
    year,
    publisher
});

const User = mongoose.model('User', userSchema);
module.exports = User;

