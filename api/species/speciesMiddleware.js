const model = require('./speciesModel');

const querySpeciesDB = () => async(req,res,next) =>{   
    /* 
    Check the database for duplication
    req.speciesIdentifier set to the resource to Add
    */    
    try{
        //Deconstruct input variable
        const {species_type} = req.body
        // Check the DB for duplicate values
        const verification = await model.findByFilter(species_type)
            //if duplicate found, return error
            if(typeof verification == 'object'){
                
               return res.status(418).json({message:"This species is already in the DB"})
            //else, move forward and set the safe variable in the return.
            }else{
                
                req.speciesIdentifier = req.body.species_type
                next();
            }

    }catch(err){
        next(err)
    }
}

const checkType = () => async(req,res,next)=>{
    //Deconstruct input variables
    const {species_type} = req.body
    //Check for string type
    if (typeof species_type != 'string'){
        return res.status(418).json({message:"species_type needs to be a string"})
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

module.exports = {
    querySpeciesDB,
    checkType,
    validateID
}