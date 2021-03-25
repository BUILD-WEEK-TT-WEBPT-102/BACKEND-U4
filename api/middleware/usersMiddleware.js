const containsUsername = () => async(req,res,next)=> {
    if(!req.body.username){
        return res.status(404).json({
            message:"Username MIA"
            })
    }
    next();        
}


module.exports = {
    containsUsername
}