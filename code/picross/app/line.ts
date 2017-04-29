import { Square } from './square';
import { Hint }   from './hint';

export class Line {
  squares: Square[] = [];
  hints: Hint[] = [];
  sections: Line[] = [];

  constructor() {
  }
  pushSquare(sq: Square): void {
    this.squares.push(sq);
  }
  findSections(): void {
    for (let s = 0, e = 0; e < this.squares.length; e++) {
      if (this.squares[e].state === Square.CROSSED) {
        this.tryFindSection(s, e);
        s = e;
      }
    }
  }
  tryFindSection(s: number, e: number): void {
    if (e - s > 1) {
      let l = new Line();
      for (; s < e; s++) {
        l.pushSquare(this.squares[s]);
      }
      this.sections.push(l);
    }
  }
}
