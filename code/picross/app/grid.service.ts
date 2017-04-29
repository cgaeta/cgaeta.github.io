import { Injectable } from '@angular/core';


import { Square }     from './square';
import { Line }       from './line';

@Injectable()
export class GridService {
  private squares: Square[] = [];
  private rows: Line[] = [];
  private columns: Line[] = [];

  setSize(w: number, h: number): Promise<void> {

    while (this.squares.length) {
      this.squares.pop();
    }

    while (this.rows.length) {
      this.rows.pop();
    }

    while (this.columns.length) {
      this.columns.pop();
    }

    for (let i = 0; i < h; i++) {
      let r: Line = new Line();
      this.rows.push(r);
    }

    for (let i = 0; i < w; i++) {
      let c: Line = new Line();
      this.columns.push(c);
    }

    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        let s: Square = new Square('sq' + (i * w + j));
        this.squares.push(s);
        this.rows[i].pushSquare(s);
        this.columns[j].pushSquare(s);
      }
    }

    return Promise.resolve();
  }

  getGrid(): Promise<Square[]> {
    return Promise.resolve(this.squares);
  }

  getRows(): Promise<Line[]> {
    return Promise.resolve(this.rows);
  }

  getSquare(idx: number): Promise<Square> {
    return Promise.resolve(this.squares[idx]);
  }
}
