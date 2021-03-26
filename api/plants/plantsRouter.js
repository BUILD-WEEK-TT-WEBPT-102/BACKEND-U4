const express = require('express');
const model = require('./plantsModel');
const router = express.Router();

/* All routes prefixed with /api/plants */
//[ ]



// Returns all plants from the database
router.get('/' , async(req, res, next)=>{
    try{
        const data = await model.findAll();
        res.status(200).json(data)
    }catch(err){
        next(err);
    }
})

//Returns plant by ID
router.get('/:id' , async(req, res, next)=>{
    try{
        
    }catch(err){
        next(err);
    }
})

//Add a plant
router.post('/' , async(req, res, next)=>{
    try{
        
    }catch(err){
        next(err);
    }
})

//Remove a plant by ID
router.delete('/:id' , async(req, res, next)=>{
    try{
        
    }catch(err){
        next(err);
    }
})

module.exports = router;