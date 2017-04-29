export class Square {
  static readonly EMPTY = 0;
  static readonly FILLED = 1;
  static readonly CROSSED = 2;
  id: string;
  state: number;

  constructor(id: string) {
    this.id = id;
    this.state = Square.EMPTY;
  }
  fill(): void { this.state = Square.FILLED; }
  cross(): void { this.state = Square.CROSSED; }
  clear(): void { this.state = Square.EMPTY; }
}
