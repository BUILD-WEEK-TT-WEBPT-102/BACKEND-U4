const express = require('express');
const model = require('./plantsModel');
const router = express.Router();
const restrict = require('../auth/authMiddleware')
const {
    hasContents,
    typeOf,
    queryUserDB,
    } = require('./plantsMiddleware')

/* All routes prefixed with /api/plants */

// Returns all plants from the database
router.get('/' ,  async(req, res, next)=>{
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
        const data = await model.findByID(req.params.id)
        res.status(200).json(data)
    }catch(err){
        next(err);
    }
})

//Add a plant
//middleware list:
/*
hasContents: req.body contains [ nickname, water_frequency, species_type, user_id]  
typeOf: req.body contains types: [string, string, int, int]
}
*/
router.post('/', hasContents(), typeOf(), async(req, res, next)=>{
        try{
            
            const dbReturn = await model.addResource(req.body)
            res.status(201).json(dbReturn)
        }catch(err){
            next(err);
        }
})

//Remove a plant by ID
router.delete('/:id' , async(req, res, next)=>{
    try{
        const dbReturn = await model.deleteResource(req.params.id)
        res.status(204).json(dbReturn)
        
    }catch(err){
        next(err);
    }
})

router.put('/:id', async(req,res, next)=>{
    try{
        const dbReturn = await model.updateResource(req.params.id , req.body)
        res.status(202).json(dbReturn)
    }catch(err){
        next(err);
    }
})

module.exports = router;