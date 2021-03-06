const model = require('./plantsModel')
const db = require('../data/db-config')
const speciesModel = require('../species/speciesModel')



//create mw
//put plant checks that IF the submitted username and the targetted update match, allow for the same nickname.
const allowSameNicknameOnEdit = () => async( req, res, next ) => {
    const editTarget = await model.findByID(req.params.id)
    console.log('body nickname', req.body.nickname)
    console.log('target nickname', editTarget.nickname)
    if ( req.body.nickname == editTarget.nickname ){
        req.sameAllowed = true;
        next()
    }
}


//hasContents = verify these exist:[nickname, water_frequency, species_type, user_id]
const plantHasContents = () => async(req,res,next) => {
    //checks the req.body for all required pieces
    if(!req.body.nickname){
        return res.status(404).json({message:"nickname Missing "})
    }
    if(!req.body.water_frequency){
        return res.status(404).json({message:"water_frequency Missing :("})
    }
    // if(!req.species_id){
    //     return res.status(403).json({message:"species_id Missing :("})
    // }
    if(!req.body.user_id){
        return res.status(404).json({message:"user_id Missing :("})
    }
    next();
}

const checkSpeciesDB = () => async(req,res,next)=>{   
    //if species has been sent to us in req.body 
    
    
    
    if(req.body.species || req.body.species_type){
        //check to see if that species exists in the db
        if(req.body.species){
            const speciesCheck = await speciesModel.findByFilter(req.body.species)

            if(!speciesCheck){
                // if a resource is not found
                const newSpecies = await speciesModel.addResource(req.body.species)
                req.species_id = newSpecies.species_id   
             
                next()
            }else{
                //if a resource IS found
                req.species_id = speciesCheck.species_id
               
                next()
            }




        }
        if(req.body.species_type){
            const speciesCheck = await speciesModel.findByFilter(req.body.species_type)

            if(!speciesCheck){
                // if a resource is not found
                const newSpecies = await speciesModel.addResource(req.body.species)
                req.species_id = newSpecies.species_id   
                
                next()
            }else{
                //if a resource IS found
                req.species_id = speciesCheck.species_id
                
                next()
            }
        }
       

        // if(!speciesCheck){
        //     // if a resource is not found
        //     const newSpecies = await speciesModel.addResource(req.body.species)
        //     req.species_id = newSpecies.species_id    
        //     next()
        // }else{
        //     //if a resource IS found
        //     req.species_id = speciesCheck.species_id
        //     next()
        // }
    }else{
        return res.status(412).json({message:"Include species(and alert your sys admin)"})
    }
}



//typeOf check on [nickname, water_frequency, species_type, user_id]
const typeOf = () => async(req,res,next) => {
    /* Remove comments for identifying object
    const typeObject = {
        nickname: (typeof req.body.nickname),
        water_frequency: (typeof req.body.water_frequency),
        species_id: (typeof req.species_id),
        species_id: (typeof req.species),
        user_id: (typeof req.body.user_id)
    }
    console.log('types: ', typeObject)
   */

    //checks the req.body for all required pieces
    if(typeof req.body.nickname != 'string'){
        return res.status(409).json({message:"nickname needs to be a string"})
    }
    if(typeof req.body.water_frequency != "string"){
        return res.status(409).json({message:"water_frequency needs to be a string"})
    }
    if(typeof req.species_id != "number"){
        return res.status(409).json({message:"species_type currently needs to be a number"})
    }
    if(typeof req.body.user_id != "number"){
        return res.status(409).json({message:"user_id needs to be a number"})
    }
    
    next();
}
//verify the user_id exists in the db (from req.body.user_id)const hasContents = () => async(req,res,next) {
const nicknameUnique = () => async(req,res,next) => {
    try{
        const dataCheck = await model.findByNickname(req.body.nickname)
        if(dataCheck){
            return res.status(418).json({message:"Nickname already exists"})
        }
        next();
    }catch(err){
        next(err)
    }
}
const forceSpeciesKeyName = () => async(req,res,next)=>{
if(req.body.species_type){
    req.body.species = req.body.species_type
}
}

module.exports = {
    plantHasContents,
    checkSpeciesDB,
    typeOf,
    nicknameUnique,
    allowSameNicknameOnEdit
}