const model = require('./speciesModel');

const querySpeciesDB = () => async(req,res,next) =>{   
    /* 
    Check the database for duplication
    req.speciesIdentifier set to the resource to Add
    */    
    try{
        //Deconstruct input variable
        const {species} = req.body
        // Check the DB for duplicate values
        const verification = await model.findByFilter(species)
            //if duplicate found, return error
            if(typeof verification == 'object'){
                
               return res.status(417).json({message:"This species is already in the DB"})
            //else, move forward and set the safe variable in the return.
            }else{
                
                req.speciesIdentifier = req.body.species
                next();
            }

    }catch(err){
        next(err)
    }
}

const checkType = () => async(req,res,next)=>{
    //Deconstruct input variables
    const {species} = req.body
    //Check for string type
    if (typeof species != 'string'){
        return res.status(416).json({message:"species needs to be a string"})
    }
    next();
}

const validateID = () => async(req,res,next)=>{
    try{
        const validation = await model.findByID(req.params.id);
        if (!validation){
            return res.status(404).json({message:"Could not find by ID"})
        }
            req.validation = validation;
            next()
    }catch(err){
        next(err)
    }
}

const speciesUnique = () => async(req,res,next)=>{
    try{
        const dataCheck = await model.findByFilter(req.body.species)
        if(dataCheck){
            return res.status(412).json({message:"Species already exists in the database"})
        }
        next();
    }catch(err){
        next(err)
    }
}

module.exports = {
    querySpeciesDB,
    speciesUnique,
    checkType,
    validateID
}