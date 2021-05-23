'use strict';
const { server } = require('../src/server.js');
const superGoose = require('@code-fellows/supergoose');
const { it, expect } = require('@jest/globals');
const request = superGoose(server);

describe('basic-auth routes testing',()=>{
    let newUser = {
        username:"vito",
        password : "www"

    } 

   it('should Add User and return the username and the hashed password',async ()=>{
     
     const response =  await request.post('/signup').send(newUser);
     expect(response.body._id.length).toBeGreaterThan(0);
     expect(response.body.username).toEqual("vito");
     expect(response.body.password.length).toBeGreaterThan(0);
    
    });

    it('should sign in  and send response or reject',async ()=>{
        const SignUp =  await request.post('/signup').send(newUser);
        const response =  await request.post('/signin').auth(newUser.username,newUser.password);

        expect(response.body.user.username).toEqual("vito");
        expect(response.body.user.password.length).toBeGreaterThan(0);


    });


});
