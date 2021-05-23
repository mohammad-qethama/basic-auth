'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();

const userMethods =  require ('./model/user.js');
const authenticate  =  require ('./middleware/basic.js');


router.post('/signup',handelSignUp);
router.post('/signin', handelSignIn);

 async function handelSignUp(req,res){

   try {
    let user = await userMethods.preSaving(req,res);
    const record = await user.save();
    res.status(201).json(record);
   } catch (error) { 
     res.status(403).json({ error: error.message });
    
   }
 }

 async function handelSignIn(req,res,next){
 
  try{
  await authenticate(req,res,next);
  console.log('i am in sign in ')
  res.status(200).json({user:{username:req.username,password:req.password}});
 }catch(error){
  res.status(401).json({ error: error.message });
 }
  
     
}

module.exports = router;