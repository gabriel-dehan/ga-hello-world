var _ = require('./vendors/underscore.js');

this.generation = [
    "Gekmo+ xosmd!",
    "Gekln, worle'",
    "Fello, wosld!",
    "Gello, wprld!",
    "Geldo, zorld!"
];
this.globalyOptimus = "Hello, world!"

exports.isGenerationPerfect = function() {
    return _.contains(this.generation, this.globalyOptimus);
};

exports.processGeneration = function() {
    console.log('Current generation :');
    console.log(this.generation);
    this.measureGenerationCost();
};

/* Get the nearest and even number for the given value.
 *
 * v - value
 * c - add, if the number is an integer, whether to take the nearest greater (true) or lesser (false) even number (default: true);
 *
 * * Return the nearest and even number.
 */
Math.nearestAndEven = function (v, c) {
    c = (c === false) ? -1 : 1;
    n = (this.floor(v) % 2 === 0) ? this.floor(v) : this.ceil(v);

    n += (n % 2 === 0) ? 0 : c;
    return n;
}

String.prototype.replaceAt=function(i, c) {
    return this.substr(0, i) + c + this.substr(i + c.length);
}

exports.getGeneration = function() {
    return this.generation;
}

exports.mateNextGeneration = function() {
    parents         = getStrongestChromosomes.call(this);
    this.generation = mate(parents);

    // Private
    function getStrongestChromosomes() {
        /* Divides the population by two and get the nearest even number.
         * Only the strongest half of the population will be in-breeding.
         */
        var matesCount = Math.nearestAndEven(this.generation.length / 2),
            strongest  = [];

        /* Select strongest chromosomes
         * For every mate we want to select :
         * We look for the chromosome with the lowest cost, select it,
         * and delete it from the generationCost array.
         */
        for(i = 0; i < matesCount; i++) {
            min = _.min(this.generationCost, function(chromosome) { return chromosome.cost; });
            strongest.push(min.identity);
            delete this.generationCost[this.generationCost.indexOf(min)];
        }

        return strongest;
    };

    function mate(parents) {
        /* Each time parents mate, they give breed to 2 offsprings.
         * A mating has a X% chance to give [2-10] (Y % 2) more offsprings, increasing the population
         * During crossover, the childs have a Z% chance of mutation.
         */
        var X = 10,
            Y = 0,
            Z = 20,
            numberOfOffsprings = 2,
            offsprings         = [];

        for(var i = 0; i < parents.length; i += 2) {
            Y = Math.nearestAndEven(Math.random() * 4 + 1);

            /*
             * Apply the X% chance of having more offsprings
             */
            if(_.random(0, 100) <= X) {
                numberOfOffsprings += Y;
            }

            /*
             * We loop with a step of two, as the crossover method will generate two offsprings.
             */
            for(var j = 0; j < numberOfOffsprings; j += 2) {
                offsprings = offsprings.concat(crossover([parents[i], parents[i + 1]], Z));
            }
        }

        return offsprings;
    };

    /*
     * Will generate two new offsprings
     */
    function crossover(parents, mutationChances) {
        var start      = 0,
            end        = parents[0].length,
            pivot      = Math.round(Math.random() * end),
            offsprings = [],
            chromatids = [];

        for(var i = 0; i < parents.length; i++) {
            chromatids.push(parents[i].slice(start, pivot));
            chromatids.push(parents[i].slice(pivot, end));
        }

        /*
         * We generate the two offspring with the chromatid extracted from the parents chromosomes
         */
        offsprings.push(chromatids[0] + chromatids[3]);
        offsprings.push(chromatids[2] + chromatids[1]);

        for(var i = 0; i < offsprings.length; i++) {
            /*
             * Apply the Z% chance of mutating
             */
            if(_.random(0, 100) <= mutationChances) {
                offsprings[i] = mutateOffspring(offsprings[i]);
            }
        }
        return offsprings;
    }

    function mutateOffspring(offspring) {
        var mutationPosition  = _.random(0, offspring.length - 1),
            direction         = _.random(0, 1),
            mutationDirection = [-1, 1];

        /* Replace a unique random character in the string by the next or the previous one on the ASCII table*/
        offspring = offspring.replaceAt(mutationPosition, String.fromCharCode(offspring.charCodeAt(mutationPosition) + mutationDirection[direction]));

        return offspring;
    }
};

exports.measureGenerationCost = function() {
    this.generationCost = [];
    var chromosomeCost = null;

    for (var i = 0; i < this.generation.length; i++) {
        chromosomeCost = getChromosomeCost.call(this, this.generation[i]);

        this.generationCost.push({
                                   identity  : this.generation[i],
                                   cost      : chromosomeCost
                                 });
    };
    chromosomeCost = null;

    return this.generationCost;

    function getChromosomeCost(chromosome) {
        // Character, Optimal character, Difference
        var c, oc = null,
            diff = 0;

        for (var i = 0; i < chromosome.length; i++) {
            c = chromosome[i];
            oc = this.globalyOptimus[i];
            diff += Math.abs(oc.charCodeAt(0) - c.charCodeAt(0));
        }
        return diff;
    }
};
