require('dotenv').config()
const express = require('express');
const model = require('../users/usersModel');
const router = express.Router();
const {queryUsername, checkRegisterContents, checkLoginContents} = require('../middleware/authMiddleware')
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
        res.status(201).json(data)
    }catch(err){
        next(err)
    }
})

router.post('/login', checkLoginContents(), queryUsername(), async ( req , res , next )=>{
    try{
        const {username, password} = req.body
        console.log('req.body.password',password)
        
        const passwordValidation = await bcrypt.compare(password, req.password)
        console.log('passwordValidation',passwordValidation)
        if( passwordValidation === true ){
            return res.status(401).json({message:'invalid credentials'})
        }
        const token = jwt.sign({
            subject: username,
            expiresIn: '24h',
            successfulLogin: true,
        }, process.env.JWT_SECRET)
        
        res.cookie("token", token)
        res.status(200).json({
            message:`Welcome ${username}`,
            token: token
        })

    }catch(err){
        next(err)
    }
})

module.exports = router;