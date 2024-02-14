// Importations nécessaires
const express = require('express');
const router = express.Router();
const User = require('../models/user'); 


router.post('/signup', async (req, res) => {
    const { nom, prenom, dateNaissance, email, affiliation, typeUtilisateur, password } = req.body;

    try {
        
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send('Cette adresse e-mail est déjà utilisée.');
        }

      
        const newUser = new User({
            nom,
            prenom,
            dateNaissance,
            email,
            affiliation,
            typeUtilisateur,
            password
        });

        
        await newUser.save();

        if (typeUtilisateur === 'admin') {
            res.redirect('/admin');
        } else if (typeUtilisateur === 'guest') {
            res.redirect('/guest');
        } else if (typeUtilisateur === 'chercheur') {
            res.redirect('/chercheur');
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'inscription de l\'utilisateur');
    }
});
router.get('/signup', (req, res) => {
    res.render('signup'); 
});
module.exports = router;
