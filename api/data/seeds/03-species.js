
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('species').insert([
    {species_type:"Flowering Plants"},
    {species_type:"Conifers, cycads & Allies"},
    {species_type:"Ferns & Fern Allies"},
    {species_type:"Mosses & Liverworts"}
  ])
};
