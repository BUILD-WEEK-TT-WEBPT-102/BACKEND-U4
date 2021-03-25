
exports.seed = function(knex) {
  // Deletes ALL existing entries
	return knex('users').insert([
		{
			username: "abc123",
			password: "abc123",
			phoneNumber: "1234567890"
		},
		{
			username: "123abc",
			password: "123abc",
			phoneNumber: "2345678901"
		},
	])
};
