const User = require('../models/user');

const getLoginPage = (req, res) => {
    res.render('login');
};

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
            return res.status(401).send('Identifiants incorrects');
        }

        // Authentification réussie, stocker l'utilisateur dans la session
        req.session.user = user;
        
        res.redirect('/dashboard'); // Rediriger vers une page de tableau de bord par exemple
    } catch (error) {
        console.error('Erreur de connexion :', error);
        res.status(500).send('Une erreur est survenue lors de la connexion');
    }
};

module.exports = { getLoginPage, postLogin };
