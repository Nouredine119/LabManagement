const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// Avant de sauvegarder l'utilisateur dans la base de données, cryptez son mot de passe
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(user.password, saltRounds);
        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

// Méthode pour vérifier le mot de passe
userSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
