exports.up = async (knex) => {

	await knex.schema
	//user table with username, password, phone number
		.createTable('users', (users) => {
			users.increments('user_id')
			users.text('username', 200).notNullable().unique()
			users.text('password', 200).notNullable()
			users.text('phoneNumber', 320).notNullable()
			// users.timestamps(false, true)
		})
	//species table with id & species
		.createTable('species', (species)=>{
			species.increments('species_id')
			species.text('species_type').unique()

		})
	//plant table with id, nickname, waterFrequency, FK species ID, FK userID
		.createTable('plants', (plants)=>{
			plants.increments('plant_id')
			plants.text('nickname').notNullable().unique()
			plants.text('water_frequency').notNullable()
			plants.integer('species_id')
				.notNullable()
				.references('species_id')
				.inTable('species')
				.onDelete('CASCADE')
				
			plants.integer('user_id')
				.notNullable()
				.references('user_id')
				.inTable('users')
				.onDelete('CASCADE')
				
		})


}

exports.down = async (knex) => {
	await knex.schema.dropTableIfExists('plants')
	await knex.schema.dropTableIfExists('species')
	await knex.schema.dropTableIfExists('users')
}
