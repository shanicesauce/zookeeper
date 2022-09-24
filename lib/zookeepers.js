const fs = require("fs");
const path = require("path");

function filterByQuery(query, zookeepers) {
  let filteredResults = zookeepers;
  if (query.age) {
    filteredResults = filteredResults.filter(
      //since out form data will be coming in as strings 
      //json data storing age as # . convert the query to string
      //perform a comparison:
      zookeeper => zookeeper.age === Number(query.age)
    );
  }
  if (query.favoriteAnimal) {
    filteredResults = filteredResults.filter(
      zookeeper => zookeeper.favoriteAnimal === query.favoritezookeeper
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      zookeeper => zookeeper.name === query.name
    );
  }
  return filteredResults;
}

function findById(id, zookeepers) {
  const result = zookeepers.filter(zookeeper => zookeeper.id === id)[0];
  return result
}

function createNewZookeeper(body, zookeepers) {
  const zookeeper = body;
  zookeepers.push(zookeeper);
  fs.writeFileSync(
    path.join(__dirname, '../data/zookeepers.json'),
    JSON.stringify({ zookeepers }, null, 2)
  );

  //return finished code to post route for response
  return zookeeper;
}

function validateZookeeper(zookeeper) {
  if (!zookeeper.name || typeof zookeeper.name !== 'string') {
    return false;
  }
  if (!zookeeper.age || typeof zookeeper.age !== 'number') {
    return false;
  }
  if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== 'string') {
    return false;
  }
  return true
}

module.exports = {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
};