const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const signupController = require('./controllers/signup');
const session = require('express-session');




const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
app.use(connectLivereload());

liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
        liveReloadServer.refresh('/');
    }, 100);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', loginRoutes);
app.use('/', signupRoutes);
app.get('/admin', signupController.adminPage);
app.get('/guest', signupController.guestPage);
app.get('/chercheur', signupController.chercheurPage);

mongoose.connect('mongodb+srv://sagourram3626:SIHAMag07"""@cluster0.kgg1cux.mongodb.net/alldata')
    .then(() => {
        console.log('Connected successfully to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });
