const db = require('../data/db-config');
const bcrypt = require('bcryptjs')

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
            "u.password"
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
    return findByID(newPerson[0])
}
const removeResource = async  (id) => {
    const deleteResource = await db('users')
        .where('user_id', id)
        .del()
    return deleteResource
}

const updateResource = async(id, resource)=>{  

    //grab the old user
    const oldResource = await findByID(id);

    const newResource = {
        username: (resource.username ? resource.username : oldResource.username),
        phoneNumber: (resource.phoneNumber ? resource.phoneNumber : oldResource.phoneNumber),
        password: (resource.password ? await bcrypt.hash(resource.password, 10): oldResource.password)
    }

    const toUpdate = await db('users')
        .where('user_id', id)
        .update(newResource, 'user_id')

    const postEdit = await findByID(toUpdate[0])
    return postEdit
}

const findUserPlants = async(id) => {
    const data = await db('users as u')
        .innerJoin('plants as p' , 'p.user_id' , 'u.user_id' )
        .innerJoin('species as s', 'p.species_id', 's.species_id')
        .select("*")
        .where('p.user_id', id)
    
    

    const returnObj = {
        user_id: data[0].user_id,
        username: data[0].username,
        phoneNumber: data[0].phoneNumber,
        plantCollection: []
    }
    if(data){
        returnObj.plantCollection = data.map(data=>{
            return{
                nickname: data.nickname,
                water_frequency: data.water_frequency,
                species_id: data.species_id,
                species_type: data.species_type
            }
        })
    }

        return returnObj
}

module.exports = {
    findAll,
    findByUsername,
    findByID,
    addResource,
    removeResource,
    updateResource,
    findUserPlants
}