const express = require('express');
const model = require('./usersModel');
const router = express.Router()


//all routes are prefixed /users

//Grab a list of all users (userID, username, phoneNumber)
router.get('/' ,  async ( req, res, next ) => {
    try{
        const data = await model.findAll()
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
})
//Grab one user (userID, username, phoneNumber)
router.get( '/:id' , async ( req, res, next ) => {
    try{
        const data = await model.findByID(req.params.id)
        if(!data){
            res.status(404).json({message:"No resource by that value"})
        }
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
})

// Add a new user (requires(all strings): username, password, phoneNumber)
// moved to authRouter

router.post( '/' ,  async ( req, res, next ) => {
    try{
        const data = await model.addResource(req.body)
        res.status(201).json(data)
    }catch(err){
        next(err)
    }
})


// Deletes the user specified with this ID
router.delete( '/:id' , async ( req, res, next ) => {
    try{
        const data = await model.removeResource(req.params.id);
        res.status(204).json({message:`Successfully deleted ID: ${req.params.id}`}) 
    }catch(err){
        next(err)
    }
})
//Edit user values: password, phoneNumber
router.put( '/:id' , async ( req, res, next ) => {
    try{
        const data = await model.updateResource(req.params.id , req.body)
        res.status(202).json(data)
    }catch(err){
        next(err)
    }
})

module.exports = router;