const db = require('../data/db-config');

const findAll = async () =>{
    const data = await db ('users as u')
        .select(
            "u.user_id",
            "u.username",
            "u.phoneNumber",
            
         )
    return data
}
const findByUsername = async (username) => {
    
    const data = await db ('users as u')
        .where('u.username', username)
        .select(
            "u.user_id",
            "u.username",
            "u.password",
            "u.phoneNumber"
        )
        .first()
    return data
}
const findByID = async (id) =>{
    const data = await db('users as u')
        .where("user_id", id)
        .select(
            "u.user_id",
            "u.username",
            "u.phoneNumber",
        )
        .first()
    return data
}


const findCollectionByID = async(id) =>{
//
}
const addResource = async  (data) => {
    //const [newPerson] = await db ('users')
    const newPerson = await db ('users')
        .insert({
            username: data.username,
            password: data.password,
            phoneNumber: data.phoneNumber
        }, "user_id")
    // return newPerson
    return findByID(newPerson[0])
}
const removeResource = async  (id) => {
    const deleteResource = await db('users')
        .where('user_id', id)
        .del()
    return deleteResource
}

module.exports = {
    findAll,
    findByUsername,
    findByID,
    addResource,
    removeResource
}