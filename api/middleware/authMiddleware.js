const model = require('../users/usersModel')

const checkUserContents = () => async(req, res, next) =>{
    const {username, password, phoneNumber}
    if(!username){
        return res.status(404).json({message:"Please provide a username"})
    }
    if(!password){
        return res.status(404).json({message:"Please provide a password"})
    }
    if(!phoneNumber){
        return res.status(404).json({message:"Please provide a phone number"})
    }
    next();
}

const queryUsername = () => async(req,res,next)=> {
    const {username} = req.body
    const verification = await model.findByFilter({username})
    if(verification){
       return res.status(418).json({message:"Username is already taken"})
    }
    next()
}

module.exports = {
    checkUserContents,
    queryUsername
}