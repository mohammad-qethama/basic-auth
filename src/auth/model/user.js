'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
  const Users = mongoose.model('users', usersSchema);


 const preSaving = async (req,res,next) => {
  
         const { username, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const user = new Users({ username, password: hash });
      return user;
    }
     
      
 
 module.exports = {
     Users:Users,
     preSaving:preSaving

 }

