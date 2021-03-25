
exports.seed = function(knex) {
  // Deletes ALL existing entries
	return knex('users').insert([
		{
			username: "abc123",
			password: "$2a$10$jm2kvnSpebIaViMBIjUFoebngQjMHTMA4LCtfdb/jfLYr7ylDwT3W",
			phoneNumber: "1234567890"
		},
		{
			username: "123abc",
			password: "$2a$10$ay91vgNaJblk/TRpMzvQo.vPKGWBU42JUNuKWgV/wxoHhlCFqchfm",
			phoneNumber: "2345678901"
		},
	])
};
