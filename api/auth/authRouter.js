require('dotenv').config()
const express = require('express');
const model = require('../users/usersModel');
const router = express.Router();
const {queryUsername, checkRegisterContents, checkLoginContents, checkLoginType} = require('../middleware/authMiddleware')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', checkRegisterContents(), queryUsername(), async(req, res , next)=>{
    try{
        //queryUsername: Username does not exist in database
        const {username, password, phoneNumber} = req.body
        const data = await model.addResource({
            username,
            password: await bcrypt.hash(password, 10),
            phoneNumber
        })

        //remove after testing
        const hashPassword1 = await bcrypt.hash('abc123', 10)
        const hashPassword2 = await bcrypt.hash('123abc', 10)
        console.log('hashPassword1', hashPassword1)
        console.log('hashPassword2', hashPassword2)


        res.status(201).json(data)
    }catch(err){
        next(err)
    }
})

//middleware it needs
/*
[x] check that login has a username and a password in req.body
[ ] check that login contents are type of 'string'
[ ] check that the username exists in the database, if it does save that password to req.password

*/
router.post('/login', 
    checkLoginType(), 
    checkLoginContents(), 
    queryUsername(), 
    async ( req , res , next )=>{
    try{
        const dbPass = req.password
        const bodyPass = req.body.password

        const passwordValidation = await bcrypt.compare(bodyPass, dbPass)
        
        if( passwordValidation === false ){
            return res.status(401).json({message:'invalid credentials'})
        }
        console.log('passwordValidation',passwordValidation)
        console.log( 'req.body.password' , req.body.password )
        console.log( 'req.password' , req.password )
        const token = jwt.sign({
            subject: req.username,
            expiresIn: '24h',
            successfulLogin: true,   
        }, process.env.JWT_SECRET)

        res.cookie("token", token)
        res.status(200).json({
            message:`Welcome ${req.body.username}`,
            token: token
        })

    }catch(err){
        next(err)
    }
})

module.exports = router;