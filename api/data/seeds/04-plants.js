
exports.seed = function(knex) {
  return knex('plants').insert([
    {
      nickname: "Mandrake Root",
      water_frequency: "Once Daily",
      species_id: 2,
      user_id: 1
    },{
      nickname: "Gillyweed",
      water_frequency: "Once an hour",
      species_id: 2,
      user_id: 1
    },{
      nickname: "Wolfsbane",
      water_frequency: "Once Daily",
      species_id: 2,
      user_id: 1
    },
  ])
};



