const model = require('./plantsModel')
const db = require('../data/db-config')
//hasContents = verify these exist:[nickname, water_frequency, species_type, user_id]
const hasContents = () => async(req,res,next) => {
    //checks the req.body for all required pieces
    if(!req.body.nickname){
        return res.status(404).json({message:"nickname Missing :("})
    }
    if(!req.body.water_frequency){
        return res.status(404).json({message:"water_frequency Missing :("})
    }
    if(!req.body.species_id){
        return res.status(404).json({message:"species_type Missing :("})
    }
    if(!req.body.user_id){
        return res.status(404).json({message:"user_id Missing :("})
    }
    next();
}

//typeOf check on [nickname, water_frequency, species_type, user_id]
const typeOf = () => async(req,res,next) => {
    // console.log('typeOf, req.body: ',req.body)
    // console.log('typeof Species_type', typeof req.body.species_type)
    //checks the req.body for all required pieces
    if(typeof req.body.nickname != 'string'){
        return res.status(404).json({message:"nickname needs to be a string"})
    }
    if(typeof req.body.water_frequency != "string"){
        return res.status(404).json({message:"water_frequency needs to be a string"})
    }
    if(typeof req.body.species_id != "number"){
        return res.status(404).json({message:"species_type currently needs to be a number"})
    }
    if(typeof req.body.user_id != "number"){
        return res.status(404).json({message:"user_id needs to be a number"})
    }
    next();
}
//verify the user_id exists in the db (from req.body.user_id)const hasContents = () => async(req,res,next) {
const queryUserDB = () => async(req,res,next) => {
    try{
        
    }catch(err){
        next(err)
    }
}

module.exports = {
    hasContents,
    typeOf,
    queryUserDB,
}