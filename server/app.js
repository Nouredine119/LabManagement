const dotenv = require('dotenv');
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('./config/passport'); 
const session = require('express-session');
const authRoutes = require('./routes/auth'); 

const app = express();


app.use(
  session({
    secret: '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',
    resave: true,
    saveUninitialized: true,
  })
);
app.use('/', authRoutes);
app.use(passport.initialize());
app.use(passport.session());

dotenv.config({path : './env'});
require('./config/connexion');
const port = process.env.PORT;

// require model 
const Users = require('./models/User');

// methodes for get data and cookies from frontEND
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(cors());


// login user
app.post('/login',async (req,res)=>{
  try{
    const email = req.body.email;
    const password = req.body.password;

    const user = await  Users.findOne({ email: email});
    if(user){
      const isMatch = await bcryptjs.compare(password,user.password);
      if(isMatch){
        const token = await user.generateToken();
        res.cookie("jwt", token,{
          expires: new Date(Date.now()+ 86400000),
          httpOnly: true
        })
        res.status(200).send('Logged in');
      }else{
        res.status(400).send('Invalide Credentials');
      }
    }else{
       res.status(400).send('Invalide Credentials');
    }

  }
  catch(err){
    res.status(400).send(err);
  }
})
//registration 
app.post('/register',async (req,res)=>{
   try{
    const firstname = req.body.Firstname;
    const lastname = req.body.Lastname;
    const birthday = req.body.birthday;
    const email = req.body.email;
    const affiliation = req.body.affiliation;
    const typeUser = req.body.typeUser;
    const password = req.body.password;

    const createUser = new Users({
          Firstname : firstname,
          Lastname : lastname,
          birthday : birthday,
          email : email,
          affiliation : affiliation,
          typeUser : typeUser,
          password : password

    });
      const created = await createUser.save();
      console.log(created);
      res.status(200).send("Registred")

   }
   catch(err){
    res.status(400).send(err)
   }
})


app.listen(3001,()=>{
  console.log("server is listening");
})