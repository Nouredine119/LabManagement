const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    dateNaissance: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    affiliation: {
        type: String,
        required: true
    },
    typeUtilisateur: {
        type: String,
        enum: ['admin', 'guest', 'chercheur'],
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
