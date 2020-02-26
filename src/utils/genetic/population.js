/* eslint-disable no-plusplus */
import DNA from './dna';

class Population {
  constructor(target, popMax, mutationRate, cells) {
    this.target = target;
    this.popMax = popMax;
    this.mutationRate = mutationRate;
    this.cells = cells;
  }

  populate() {
    this.population = [];
    for (let i = 0; i < this.popMax; i++) {
      const dna = new DNA();

      this.population[i] = dna.makeDNA(this.target, this.cells);
    }

    this.generation(0, 2000);

    this.population.sort((a, b) => b.max_delta - a.max_delta);
    return this.population[0];
  }

  generation(gen, maxGen) {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.target, this.population[i].genes);
    }
    this.population.sort((a, b) => b.fitnes - a.fitnes);

    const child = this.population[0].mate(this.population[1].genes);
    this.population.splice(this.population.length - 2, 2, child[0], child[1]);

    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.target, this.population[i].genes);
      this.population[i].mutate(this.mutationRate, this.cells);
    }
    if (gen < maxGen) {
      this.generation(gen + 1, maxGen);
    }
  }
}

export default Population;
