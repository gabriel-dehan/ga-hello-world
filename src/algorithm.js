        require('../lib/math');
        require('../lib/string');
var p = require('../lib/p'),
    _ = require('../vendors/underscore');


module.exports.run = function() {
    var globalyOptimus = "Hello, world!",
        offsprings = null,
        generation = null;

    var population = [
        "Gekmo+ xosmd!",
        "Gekln, worle'",
        "Fello, wosld!",
        "Gello, wprld!",
        "Geldo, zorld!"
    ];

    var Generation = require('./generation');
    generation = new Generation(population, globalyOptimus);

    while (!generation.hasBredPerfectOffspring(globalyOptimus)) {
       generation.process();
       offsprings = generation.mate();
       generation = new Generation(offsprings, globalyOptimus);
    }
    p(generation.toString());
};

