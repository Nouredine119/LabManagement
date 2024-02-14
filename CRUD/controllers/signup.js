const adminPage = (req, res) => {
    res.send('Bienvenue sur la page admin');
};

const guestPage = (req, res) => {
    res.send('Bienvenue sur la page invité');
};

const chercheurPage = (req, res) => {
    res.send('Bienvenue sur la page chercheur');
};

module.exports = { adminPage, guestPage, chercheurPage };
