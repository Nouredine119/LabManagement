const express = require('express');
const mongoose = require('mongoose');

const Article = require("./models/Article");

mongoose.connect('mongodb://localhost:27017/').then(()=>{
  console.log("database connecte")
}).catch((error)=>{
  console.log("error in database : "+error)
})

const app =express();

app.use(express.json())

app.get('/numbers',(req,res)=>{
  let numbers = "";
  for(let i=1;i<=100;i++){
    numbers +=`${i}-`;
  }

  res.render("numbers.ejs",{
    name :"yarob",
    numbers : numbers
  });
})

app.get("/sayHello",(req,res)=>{
 
  res.json({
    name : req.body.name,
    age : req.query.age
  })
 
})

app.post('/addComment',(req,res)=>{
  res.send('add comment');
})

app.delete('/delete',(req,res)=>{
  res.send('testing delete');
})

///////////////ARTICLES/////////////////

app.post("/articles",async(req,res)=>{
  const newArticle = new Article()
  const artTitle = req.body.Articletitle 
  const artBody = req.body.Articlebody
  
  
  newArticle.title = artTitle
  newArticle.body = artBody
  newArticle.numberOfLikes = 0
  await newArticle.save()
  res.json(newArticle)
})

app.get('/articles', async(req, res)=>{
  const articles = await Article.find()
  console.log(articles)
  res.json(articles)
})


app.listen(3000,()=>{
  console.log("Server is running on port 3000");
})