var Chance = require('chance')
var chance = new Chance()

var express = require('express')
var app = express()

app.get('/', function(req, res) {
    res.send(generateRandomWorkingAnimals());
});

app.listen(3000, function() {
    console.log("Accepting HTTP requests on port 3000");
});

function generateRandomWorkingAnimals() {
    var numberOfAnimals = chance.integer({
        min: 0,
        max: 10
    });
    console.log(numberOfAnimals);
    var animals = [];
    for (var i = 0; i < numberOfAnimals; i++) {
        animals.push({
            animal: chance.animal(),
            firstName: chance.first(),
            lastName: chance.last(),
            profession: chance.profession()
        });
    }
    console.log(animals);
    return animals;
}