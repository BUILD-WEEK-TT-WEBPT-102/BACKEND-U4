const express = require('express');
const model = require('./speciesModel');
const router = express.Router();
const {validateID, querySpeciesDB, checkType} = require('./speciesMiddleware')

router.get('/', async(req,res,next)=>{
    try{
        const data = await model.findAll()
        if(!data){
            return res.status(418).json({message:"No users found"})
        }
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
})

router.get('/:id', validateID(), async(req,res,next)=>{
    try{
       return res.status(200).json(req.validation)
    }catch(err){
        next(err)
    }
})

router.post('/', 
    checkType(),
    querySpeciesDB(),
    async(req,res,next)=>{
        try{
            /*
            checkType: Verifies input [req.body.species_type] is a string
            querySpeciesDB: Returns req.speciesIdentifier to use as species_type
            */
                const species = req.speciesIdentifier
                const data = await model.addResource(species)
                res.status(204).json(data)
            }catch(err){
                next(err)
            }
})

router.delete('/:id', async(req,res,next)=>{
    try{
        const data = await model.deleteResource(req.params.id)
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
})

module.exports = router;