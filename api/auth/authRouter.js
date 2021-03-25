const express = require('express');
const model = require('../users/usersModel');
const router = express.Router();
const {queryUsername, checkUserContents} = require('../middleware/authMiddleware')

router.post('/register', checkUserContents(), queryUsername(), async(req, res , next)=>{
    try{
        //queryUsername: Username does not exist in database
        const data = await model.addResource(req.body)
        res.status(201).json(data)
    }catch(err){
        next(err)
    }
})

module.exports = router;