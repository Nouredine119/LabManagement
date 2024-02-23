const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user = new mongoose.Schema({
  Firstname: {
    type: String,
    default: null
},
Lastname: {
    type: String,
    default: null
},
birthday: {
    type: Date,
    default: null
},
email: {
    type: String,
    required: true,
    unique: true
},
affiliation: {
    type: String,
    default: null
},
typeUser: {
    type: String,
    enum: ['admin', 'guest', 'chercheur'],
    default: null
},
password: {
    type: String,
    default: null
},
googleId: {
  type: String,
  default: null
},
tokens : [
    {
      token : {
        type: String,
        required: true
      }
    }
]
})

//hashing password for security
user.pre('save',async function (next) {
  if(this.isModified('password')){
    this.password = bcryptjs.hashSync(this.password,10);
  }
  next();
})
//generate token for verify user
user.methods.generateToken = async function(){
  try{
    let generatedToken = jwt.sign({__id:this.__id},process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token :generatedToken });
    await this.save();
    return generatedToken;
  }
  catch(err){
    console.log(err)
  }
}

const Users = new mongoose.model("USER",user);

module.exports = Users;