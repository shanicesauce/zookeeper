const express = require('express');
const res = require('express/lib/response');
const { animals } = require('./data/animals.json');
const PORT = process.env.PORT || 3001;
const app = express();

function filterByQuery(query, animalsArray) {
     let personalityTraitsArray = [];

      //animalsArray filteredResults here
     let filteredResults = animalsArray;
   
     if (query.personalityTraits){
         //if personalityTraits string place into a new array and save
         if (typeof query.personalityTraits === 'string'){
             personalityTraitsArray = [query.personalityTraits]
         } else {
             //save personalityTraits as dedicated array
             personalityTraitsArray = query.personalityTraits;
         }
     }
     // loop through traits in personality array 
     personalityTraitsArray.forEach(trait => {
         //check trait against each animal in filtered array 
         filteredResults = filteredResults.filter(
             animal => animal.personalityTraits.indexOf(trait) !== -1
         );
         
     });
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
  }
function findById(id, animalsArray){
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result
}

app.get('/api/animals', (req, res) => {
    let results = {};
    if (req.query){
   results = filterByQuery(req.query, animals);
    };
    res.json(results)
});

app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result){
  res.json(result)
  } else {
    res.send(404)
  }
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

