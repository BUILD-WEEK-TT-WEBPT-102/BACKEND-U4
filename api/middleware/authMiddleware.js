const model = require('../users/usersModel')

const queryUsername = () => async(req,res,next)=> {
    const {username} = req.body
    const verification = await model.findByFilter({username})
    if(verification){
       return res.status(418).json({message:"Username is already taken"})
    }
    next()
}

module.exports = {
    queryUsername
}