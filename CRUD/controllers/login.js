const User = require('../models/user');

const getLoginPage = (req, res) => {
    res.render('login');
};

const postLogin = async (req, res) => {
    const { email, password } = req.body;
    const arr = await User.find();
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).send('Adresse e-mail incorrecte');
        }

        const isValidPassword = await user.isValidPassword(password);

        if (!isValidPassword) {
            return res.status(401).send('Mot de passe incorrect');
        }

        req.session.user = user;
        res.render('home',{arr}); 
    } catch (error) {
        console.error('Erreur de connexion :', error);
        res.status(500).send('Une erreur est survenue lors de la connexion');
    }
};

module.exports = { getLoginPage, postLogin };
