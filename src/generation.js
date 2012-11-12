var p = require('../lib/p'),
    _ = require('../vendors/underscore'),
    Chromosome = require('./chromosome'),
    Generation;

// Populate the generation
exports = module.exports = Generation = function (population, globalyOptimus) {
    var chromosome;

    this.population     = [];
    this._raw           = population;
    this.globalyOptimus = globalyOptimus;

    population.forEach(function(individual, index, population) {
        chromosome = new Chromosome(population[index], this);
        this.population.push(chromosome);
    }, this);

    chromosome  = null;
};

Generation.prototype.hasBredPerfectOffspring = function () {
    if (this.globalyOptimus === undefined) { throw 'Globaly Optimus not set'; }
    return _.contains(this._raw, this.globalyOptimus);
};

Generation.prototype.process = function() {
    this.population.forEach(function(individual, index, population) {
        var self = population[index];
        self.measureCost();
    });
};

Generation.prototype.mate = function() {
    var parents = getStrongestChromosomes.call(this);
    return mate(parents);

    // Private
    function getStrongestChromosomes() {
        /* Divides the population by two and get the nearest even number.
         * Only the strongest half of the population will be in-breeding.
         */
        var matesCount = Math.nearestAndEven(this.population.length / 2),
            population ,
            strongests = [];

        /* Select strongest chromosomes
         * For every mate we want to select :
         * We look for the chromosome with the lowest cost, select it,
         * and delete it from the generationCost array.
         */
        function _chromosomeCost(chromosome) { return chromosome.cost; }
        population = _.sortBy(this.population, _chromosomeCost);
        for (var i = 0; i < matesCount; i++) {
            strongests.push(population[i]);
        }

        return strongests;
    }

    function mate(parents) {
        /* Each time parents mate, they give breed to 2 offsprings.
         * A mating has a X% chance to give [2-10] (Y % 2) more offsprings, increasing the population
         * During crossover, the childs have a Z% chance of mutation.
         */
        var X = 10,
            Y = 0,
            Z = 20,
            numberOfOffsprings = 2,
            offsprings = [];

        for (var i = 0; i < parents.length; i += 2) {
            Y = Math.nearestAndEven(Math.random() * 4 + 1);

            /*
             * Apply the X% chance of having more offsprings
             */
            if (_.random(0, 100) <= X) {
                numberOfOffsprings += Y;
            }

            /*
             * We loop with a step of two, as the crossover method will generate two offsprings.
             */
            for (var j = 0; j < numberOfOffsprings; j += 2) {
                offsprings = offsprings.concat(crossover([parents[i], parents[i + 1]], Z));
            }
        }

        return _.map(offsprings, function(chromosome) { return chromosome.sequence; });
    }

    /*
     * Will generate two new offsprings
     */
    function crossover(parents, mutationChances) {
        var chromatids = processMitosis(parents);
        return createOffsprings(chromatids, mutationChances);
    }

    function processMitosis(chromosomes) {
        var chromatids = [],
            length     = chromosomes[0].sequence.length,
            pivot      = Math.round(Math.random() * length);

        chromosomes.forEach(function (chromosome) {
            chromatids.push(chromosome.splitOff(pivot));
        }, this);

        return _.flatten(chromatids);
    }

    function createOffsprings(chromatids, mutationChances) {
        var offsprings;
        /*
         * We generate the two offspring with the chromatid extracted from the parents chromosomes
         */

        offsprings = Chromosome.compose(chromatids);

        for (var i = 0; i < offsprings.length; i++) {
            /*
             * Apply the Z% chance of mutating
             */
            if (_.random(0, 100) <= mutationChances) {
                offsprings[i].mutate();
            }
        }
        return offsprings;
    }
};

Generation.prototype.toString = function() {
    return this._raw;
};