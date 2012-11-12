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
main.js<br />
src/<br />
&nbsp;&nbsp;&nbsp;&nbsp;+- algorithm.js<br />
&nbsp;&nbsp;&nbsp;&nbsp;+- generation.js<br />
&nbsp;&nbsp;&nbsp;&nbsp;+- chromosom.js<br />
lib/<br />
&nbsp;&nbsp;&nbsp;&nbsp;+- math.js<br />
&nbsp;&nbsp;&nbsp;&nbsp;+- string.js<br />
&nbsp;&nbsp;&nbsp;&nbsp;+- p.js<br />
vendors/<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+- underscore.js<br />