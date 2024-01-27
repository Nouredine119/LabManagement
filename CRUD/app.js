const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');


app.use(express.urlencoded({extended: true}));

app.use(express.static('public'))



const Article = require('./models/mydata')

app.set('view engine', 'ejs')


app.get('/', (req, res) => {

    Article.find().then((result)=>{
        res.render("home", {title: 'Home', arr: result})
    }).catch((err)=>{console.log(err);})
  
})
app.listen(port, () => {
  console.log(`http://localhost:3000/`)
}) 
mongoose.connect('mongodb+srv://sagourram3626:SIHAMag07"""@cluster0.kgg1cux.mongodb.net/alldata?retryWrites=true&w=majority').then(() => {
       console.log('connected successfully')
}).catch(()=>{
    console.log('error connecting ')
})


app.post('/', (req, res) => {
     console.log(req.body) 

     const article = new Article(req.body)
     article.save().then(()=>{
        res.redirect('index.ejs')
     }).catch(()=>{
        console.log('error saving');
     })
     
})

