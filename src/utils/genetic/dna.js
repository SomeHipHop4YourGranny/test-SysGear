/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */

// Простая реализация генетического алгоритма

class DNA {
  constructor(genes) {
    if (genes) {
      this.genes = genes;
      this.child = true;
    }
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  makeDNA(target, cells) {
    this.genes = [];
    const localCells = cells.slice();
    for (let i = 0; i < target.length; i++) {
      let rndmMain;
      let rndmSec;
      let mainTr;
      let secTr;
      // необходимо чтобы небыло повторений ячеек в двигателе, аналогично и в других местах класса
      if (localCells.length > 0) {
        if (this.random(0, 2) !== 0) {
          rndmMain = this.random(0, localCells.length);
          mainTr = localCells[rndmMain];
          localCells.splice(rndmMain, 1);
        } else {
          mainTr = 0;
        }
      } else {
        mainTr = 0;
      }

      if (localCells.length > 0) {
        if (this.random(0, 2) !== 0) {
          rndmSec = this.random(0, localCells.length);
          secTr = localCells[rndmSec];
          localCells.splice(rndmSec, 1);
        } else {
          secTr = 0;
        }
      } else {
        secTr = 0;
      }

      this.genes[i] = {
        main_trust: mainTr,
        second_trust: secTr,
      };
    }
    return this;
  }

  calcFitness(target, genes) {
    let score = 0;
    let delta = 0;
    this.max_delta = 0;
    for (let i = 0; i < genes.length; i++) {
      delta += genes[i].main_trust + genes[i].second_trust / 2;

      if (genes[i].main_trust + genes[i].second_trust / 2 > target[i]) {
        delta = 0;
        score = 0;
        break;
      } else if (delta > this.max_delta) {
        score++;
      }
    }

    if (delta > this.max_delta) {
      this.max_delta = delta;
    }

    this.fitnes = score;
  }

  mutate(mutationRate, cells) {
    if (Math.random() > mutationRate) return;
    const index = this.random(0, this.genes.length);

    const localCells = cells.slice();
    let idx;

    const mutant = [];
    for (let i = 0; i < this.genes.length; i++) {
      idx = localCells.indexOf(this.genes[i].main_trust);
      idx >= 0 ? localCells.splice(idx, 1) : false;

      idx = localCells.indexOf(this.genes[i].second_trust);
      idx >= 0 ? localCells.splice(idx, 1) : false;
    }

    for (let i = 0; i < this.genes.length; i++) {
      if (i === index) {
        let rndmMain;
        let rndmSec;
        let mainTr;
        let secTr;

        if (localCells.length > 0) {
          rndmMain = this.random(0, localCells.length);

          mainTr = localCells[rndmMain];
          localCells.splice(rndmMain, 1);
        } else {
          mainTr = 0;
        }
        if (localCells.length > 0) {
          rndmSec = this.random(0, localCells.length);
          secTr = localCells[rndmSec];
          localCells.splice(rndmSec, 1);
        } else {
          secTr = 0;
        }
        mutant.push({
          main_trust: mainTr,
          second_trust: secTr,
        });
      } else mutant.push(this.genes[i]);
    }
    this.mut = true;
    this.genes = mutant;
  }

  mate(gene) {
    const child1 = [];
    const child2 = [];
    for (let i = 0; i < gene.length; i++) {
      child1[i] = {
        main_trust: gene[i].main_trust,
        second_trust: gene[i].second_trust,
      };
      child2[i] = {
        main_trust: gene[i].second_trust,
        second_trust: gene[i].main_trust,
      };
    }

    return [new DNA(child1), new DNA(child2)];
  }
}

export default DNA;
