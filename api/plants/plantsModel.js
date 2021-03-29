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
            "u.username as plantOwner"
            )
    return data
}

const addResource = async(data)=>{
    const newResource = await db('plants')
        .insert(data)

    return newResource
    // return findByID(newResource)
}

module.exports = {
    findAll,
    findByID,
    addResource,

}

//knex.from('plants').innerJoin('species', 'plants.id', 'species.user_id')