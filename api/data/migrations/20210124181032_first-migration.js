exports.up = async (knex) => {

	await knex.schema
	//user table with username, password, phone number
		.createTable('users', (users) => {
			users.increments('user_id')
			users.string('username', 200).notNullable().unique()
			users.string('password', 200).notNullable()
			users.string('phoneNumber', 320).notNullable()
			users.timestamps(false, true)
		})
	//species table with id & species
		.createTable('species', (species)=>{
			species.increments('species_id')
			species.string('species_type')

		})
	//plant table with id, nickname, waterFrequency, FK species ID, FK userID
		.createTable('plants', (plants)=>{
			plants.increments('plant_id')
			plants.string('nickname').notNullable().unique()
			plants.string('water_frequency').notNullable()
			plants.integer('species_id')
				.notNullable()
				.references('species_id')
				.inTable('species')
			plants.integer('user_id')
				.notNullable()
				.references('user_id')
				.inTable('users')
		})


}

exports.down = async (knex) => {
	await knex.schema.dropTableIfExists('plants')
		.dropTableIfExists('species')
		.dropTableIfExists('users')
}
