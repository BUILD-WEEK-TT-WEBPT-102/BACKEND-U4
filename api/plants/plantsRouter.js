const express = require('express');
const model = require('./plantsModel');
const router = express.Router();
const restrict = require('../auth/authMiddleware')
const {
    plantHasContents,
    checkSpeciesDB,
    typeOf,
    nicknameUnique,
    allowSameNicknameOnEdit,
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
router.post('/', checkSpeciesDB(),plantHasContents(), typeOf(), nicknameUnique(), async(req, res, next)=>{
        try{
            const {nickname, water_frequency, user_id} = req.body

            const newPlant = {
                nickname: nickname,
                water_frequency: water_frequency,
                user_id: user_id,
                species_id: req.species_id
            }

        

            const dbReturn = await model.addResource(newPlant)

        
            if(dbReturn){
                
                res.status(201).json(dbReturn)
            }else{
              
                res.status(417).json({message:'so close'})
            }
        }catch(err){
            next(err);
        }
})

//Remove a plant by ID
router.delete('/:id' , async(req, res, next)=>{
    try{
        let dbReturn = await model.deleteResource(req.params.id)
        
        if(dbReturn == 1){
            res.status(202).json({
                message:"Resource Deleted",
                plant_id: req.params.id
            })
        }else{
            res.status(418).json({message: 'error deleting resource'})
        }

        
    }catch(err){
        next(err);
    }
})

router.put('/:id',
    checkSpeciesDB(),
    plantHasContents(), 
    typeOf(), 
    
    async(req,res, next)=>{
    try{
        console.log(req.species_id)
        const dbReturn = await model.updateResource(req.params.id , req.body, req.species_id)
        res.status(202).json(dbReturn)
    }catch(err){
        next(err);
    }
})

module.exports = router;