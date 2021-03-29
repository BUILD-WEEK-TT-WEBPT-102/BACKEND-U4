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

const updateResource = async(id, resource)=>{  
    const toUpdate = await db('users')
        .where('user_id', id)
        .update({
            username: resource.username,
            phoneNumber: resource.phoneNumber
        }, 'user_id')
    const postEdit = await findByID(toUpdate[0])
    return postEdit
}

const findUserPlants = async(id) => {
    const data = await db('users as u')
        .innerJoin('plants as p' , 'p.user_id' , 'u.user_id' )
        .innerJoin('species as s', 'p.species_id', 's.species_id')
        .select("*")
        .where('p.user_id', id)
    
    console.log('data', data)

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