 'use strict';
 const bcrypt = require('bcrypt');
const base64 = require('base-64');
const Users = require('../model/user.js').Users;

const SignIn =  async (req,res,next) => {

 
  try {
    let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
    let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
    let decodedString = base64.decode(encodedString); // "username:password"
    let [username, password] = decodedString.split(':'); // username, password
    console.log(basicHeaderParts);
    console.log(encodedString);
    console.log(decodedString);
    console.log( username);

  
    
          console.log( username);

      const user = await Users.findOne({ username: username });
      const valid = await bcrypt.compare(password, user.password);
      console.log(valid);

      if (valid) {

            req.username = user.username;
            req.password = user.password;

           next();
            }
      else {
        next('Invalid User')
      }
    } catch (error) { next("Invalid Login"); }
    

}

module.exports = SignIn;