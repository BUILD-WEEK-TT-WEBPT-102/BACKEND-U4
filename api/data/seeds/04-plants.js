
exports.seed = function(knex) {
  return knex('plants').insert([
    {
      nickname: "Mandrake Root",
      water_frequency: "Once Daily",
      species_id: 1,
      user_id: 1
    },{
      nickname: "Gillyweed",
      water_frequency: "Once an hour",
      species_id: 2,
      user_id: 1
    },{
      nickname: "Wolfsbane",
      water_frequency: "1x Morning",
      species_id: 3,
      user_id: 5
    },{
      nickname: "Snowthorn",
      water_frequency: "1x During Cold Hours",
      species_id: 4,
      user_id: 5
    },{
      nickname: "Kingsfoil",
      water_frequency: "Twice Daily",
      species_id: 5,
      user_id: 3
    },{
      nickname: "Columalda",
      water_frequency: "Once Daily",
      species_id: 6,
      user_id: 3
    },
    {
      nickname: "Elanor",
      water_frequency: "Three times a day",
      species_id: 7,
      user_id: 4
    },{
      nickname: "Green Thumb",
      water_frequency: "Occasionally (max 3 days)",
      species_id: 1,
      user_id: 4
    },
  ])
};



