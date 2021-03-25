const db = require('../data/db-config');

const findAll = async () =>{
    const data = await db ('users as u')
        .select(
            "u.user_id",
            "u.username",
            "u.phoneNumber",
            "u.created_at as memberSince",
            "u.updated_at as lastEdit"
        )
    return data
}
const findByFilter = async () => {

}
const findByID = async (id) =>{
    const data = await db('users as u')
        .where("user_id", id)
        .select(
            "u.username",
            "u.phoneNumber",
            "u.created_at as memberSince",
            "u.updated_at as lastEdit"
        )
        // .first()
    return data
}

const findCollectionByID = async(id) =>{

}
const addResource = async  (data) => {
    const newPerson = await db ('users')
        .insert({
            username: data.username,
            password: data.password,
            phoneNumber: data.phoneNumber
        })
    return newPerson
}
const removeResource = async  () => {

}

module.exports = {
    findAll,
    findByFilter,
    findByID,
    addResource,
    removeResource
}