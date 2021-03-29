const db = require('../data/db-config')

//find all plants
const findAll = async()=>{
    const data = await db
        .from('plants as p')
        .innerJoin('species as s', 'p.species_id', 's.species_id')
        .innerJoin('users as u', 'p.user_id', 'u.user_id')
        .select(
            "p.plant_id",
            "p.nickname",
            "p.water_frequency",
            "s.species_type as species",
            "u.username as plantOwner"
            )
    return data
}
//find by the plants id
const findByID = async(id)=>{
    const data = await db
        .from('plants as p')
        .where('plant_id', id)
        .innerJoin('species as s', 'p.species_id', 's.species_id')
        .innerJoin('users as u', 'p.user_id', 'u.user_id')
        .select(
            "p.plant_id",
            "p.nickname",
            "p.water_frequency",
            "s.species_type as species",
            "s.species_id",
            "u.username",
            "u.user_id"
            )
        .first()
    return data
}

const addResource = async(data)=>{
    const id = await db('plants')
        .insert({
            nickname: data.nickname,
            water_frequency: data.water_frequency,
            species_id: data.species_id,
            user_id: data.user_id
        }, "plant_id")
        
    return findByID(id[0])
}

const deleteResource = async(id)=>{
    const deleteResource = await db('plants')
        .where('plant_id', id)
        .del()
    return deleteResource
}

const updateResource = async(id, resource)=>{
    const updateTarget = await findByID(id)
    
    const toUpdate = await db('plants')
        .where('plant_id', id)
        .update({
            nickname: resource.nickname,
            water_frequency: resource.water_frequency,
            species_id: updateTarget.species_id,
            user_id: updateTarget.user_id
        }, 'plant_id')
    return findByID(toUpdate[0])
}

module.exports = {
    findAll,
    findByID,
    addResource,
    deleteResource,
    updateResource
}

//knex.from('plants').innerJoin('species', 'plants.id', 'species.user_id')