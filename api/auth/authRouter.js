require('dotenv').config()
const express = require('express');
const model = require('../users/usersModel');
const router = express.Router();
module.exports = {
    checkRegisterContents,
    queryUsernameRegister,
    checkContents,
    checkTypeOf,
    queryUsernameLogin,
} = require('../middleware/authMiddleware')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


//middleware it needs
/*
[x] check that register has a username, password, phoneNumber in req.body
[x] check that Register contents are type of 'string'
[x] check that the username exists in the database, if it does save that password to req.hashPassword

*/
router.post('/register', 
    checkRegisterContents(), 
    checkTypeOf(),
    queryUsernameRegister(), 
    async(req, res , next)=>{
        try{
            //queryUsername: Username does not exist in database
            const {username, password, phoneNumber} = req.body
            const data = await model.addResource({
                username,
                password: await bcrypt.hash(password, 10),
                phoneNumber
            })

            res.status(201).json(data)
        }catch(err){
            next(err)
        }
})

//middleware it needs
/*
[x] check that login has a username and a password in req.body
[x] check that login contents are type of 'string'
[x] check that the username exists in the database, if it does save that password to req.hashPassword

*/
router.post('/login', 
    checkTypeOf(), 
    checkContents(),
    queryUsernameLogin(), 
    async ( req , res , next )=>{
        try{
            
            const dbPass = req.hashPassword
            const bodyPass = req.body.password
            const passwordValidation = await bcrypt.compare(bodyPass, dbPass)
            if( passwordValidation === false ){
                return res.status(401).json({message:'invalid credentials'})
            }

          

            const token = jwt.sign({
                subject: req.body.username,
                user_id: req.user_id,
                expiresIn: '24h',
                successfulLogin: true,   
            }, process.env.JWT_SECRET)
            
            res.cookie("token", token)
            res.status(200).json({
                message:`Welcome to the server ${req.body.username}`,
                user_id: req.user_id,
                username: req.body.username,
                token: token
            })

        }catch(err){
            next(err)
        }
})

module.exports = router;