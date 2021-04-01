
exports.seed = function(knex) {
  // Deletes ALL existing entries
	return knex('users').insert([
		{
			username: "abcd1234",
			password: "$2a$10$c4pQE1UeQoCnqIsr6Ncsp.n8I8/G8GoJYcbF3mH7NleyDOm2.1cqK",
			phoneNumber: "1234567890"
		},{
			username: "1234abcd",
			password: "$2a$10$WeRVo9bM51kYE3ufwivs4O5NK0l0ODmZIqw6iMBXBfmAWAqZONXJS",
			phoneNumber: "2345678901"
		},{
			username: "Seth MacPherson",
			password: "$2a$10$WeRVo9bM51kYE3ufwivs4O5NK0l0ODmZIqw6iMBXBfmAWAqZONXJS",
			phoneNumber: "7021234567"
		},{
			username: "Polly Yospan",
			password: "$2a$10$WeRVo9bM51kYE3ufwivs4O5NK0l0ODmZIqw6iMBXBfmAWAqZONXJS",
			phoneNumber: "3851234567"
		},{
			username: "Tony So",
			password: "$2a$10$WeRVo9bM51kYE3ufwivs4O5NK0l0ODmZIqw6iMBXBfmAWAqZONXJS",
			phoneNumber: "8851234567"
		},
	])
};
