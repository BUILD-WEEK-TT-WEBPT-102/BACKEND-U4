const db = require('../data/db-config')

const findAll = async()=>{
    const data = await db
        .from('plants as p')
        //reminder : Grab Table, Point to destination, point to table reference
        .innerJoin(
            'species as s', 
            'p.species_id', 
            's.species_id'
        )
        // .innerJoin('species as ', 's.species_id', 'p.species_id')
        .innerJoin(
            'users as u', 
            'p.user_id', 
            'u.user_id'
        )
        // .innerJoin('users as u', 'u.user_id', 'p.user_id')
        .select(
            "p.plant_id as plantID",
            "p.nickname",
            "p.water_frequency as waterFrequency",
            "s.species_type as species",
            "u.username as plantOwner"
        )
    return data
}

module.exports = {
    findAll,
}

//knex.from('plants').innerJoin('species', 'plants.id', 'species.user_id')