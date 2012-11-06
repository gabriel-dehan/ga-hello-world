var ga = require('./ga.js');

console.time('Hello world generation');
while (!ga.isGenerationPerfect()) {
    ga.processGeneration();
    ga.mateNextGeneration();
}
if (ga.isGenerationPerfect) {
    console.log('Optimal generation is : ');
    console.log(ga.getGeneration());
}
console.timeEnd('Hello world generation');