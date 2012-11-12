ga-hello-world
==============

A genetic algorithm for generating the common Hello World sentence.

## Informations
Currently, for a mating :
Each mating has a 10% chance of breeding +[2-10] offsprings, which each have a 20% chance of mutation.

The algorithm can eventually fail if it sticks on going with bad mutation.

## Run the algorithm
```
$ node main.js
```

## Architecture :
main.js
src/
   +- algorithm.js
   +- generation.js
   +- chromosom.js
lib/
   +- math.js
   +- string.js
   +- p.js
vendors/
       +- underscore.js