const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user'); 

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    User.find().then((result) => {
        res.render("home", { title: 'Home', arr: result });
    }).catch((err) => { console.log(err); });
});


app.post('/', (req, res) => {
    const { firstName, lastName, profession, age } = req.body;
    const newUser = new User({ firstName, lastName, profession, age });
    newUser.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error adding user');
        });
});


app.get('/:id/edit', (req, res) => {
    const userId = req.params.id;
    User.findById(userId)
        .then(user => {
            res.render('edit', { user: user });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error retrieving user for editing');
        });
});


app.post('/:id/edit', (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, profession, age } = req.body;

    User.findByIdAndUpdate(userId, { firstName, lastName, profession, age }, { new: true })
        .then(updatedUser => {
            res.redirect('/');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error updating user');
        });
});

app.delete('/:id/delete', (req, res) => {
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
        .then(() => {
            res.redirect('/');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error deleting user');
        });
});


mongoose.connect('mongodb+srv://sagourram3626:SIHAMag07"""@cluster0.kgg1cux.mongodb.net/alldata?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected succesfully');
        
        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

const path = require('path');
const livereload = require('livereload');
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLivereload = require('connect-livereload');
app.use(connectLivereload());

liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
        liveReloadServer.refresh('/');
    }, 100);
});
