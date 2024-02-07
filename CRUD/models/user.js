const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    profession: String,
    affiliation: String,
    age: Number,
    articleIds : Object,
    type:{admin,membre,guest}
});

const User = mongoose.model('User', userSchema);
module.exports = User;
