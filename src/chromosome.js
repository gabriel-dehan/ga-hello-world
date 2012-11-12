var _ = require('../vendors/underscore'),
    Chromosome;

exports = module.exports = Chromosome = function (sequence, generation) {
    this.sequence   = sequence;
    this.cost       = null;
    this.generation = generation;
};

Chromosome.prototype.measureCost = function () {
    // Character, Optimal character, Difference
    var c, oc = null,
        diff  = 0,
        go    = this.generation.globalyOptimus;

    for (var i = 0; i < this.sequence.length; i++) {
        c    = this.sequence[i];
        oc   = go[i];
        diff += Math.abs(oc.charCodeAt(0) - c.charCodeAt(0));
    }

    this.cost = diff;
};

Chromosome.prototype.splitOff = function(pivot) {
    var start = 0,
        end   = this.sequence.length;

    return [
        this.sequence.slice(start, pivot),
        this.sequence.slice(pivot, end)
    ];
};

Chromosome.prototype.mutate = function () {
    var sequence = this.sequence,
        mutationPosition = _.random(0, sequence.length - 1),
        direction = _.random(0, 1),
        mutationDirection = [-1, 1];

    /* Replace a unique random character in the string by the next or the previous one on the ASCII table*/
    this.sequence = sequence.replaceAt(mutationPosition, String.fromCharCode(sequence.charCodeAt(mutationPosition) + mutationDirection[direction]));
};

Chromosome.compose = function(chromatids) {
    return [
        new this(chromatids[0] + chromatids[3], null),
        new this(chromatids[2] + chromatids[1], null)
    ];
};
