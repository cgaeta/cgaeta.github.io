import { Component, OnInit }  from '@angular/core';

import { Square }             from './square';
import { Line }               from './line';
import { GridService }        from './grid.service';

@Component({
  selector: 'my-app',
  template: `
  <h1>Hello {{name}}</h1>
  <input type="number" [(ngModel)]="width" />
  <input type="number" [(ngModel)]="height" />
  <input type="button" (click)="getGrid()" value="Set Size"/>
  <div *ngFor="let r of rows">
    <line-hints [hints]=r.hints [max]="width"></line-hints>
    <picross-square *ngFor="let sq of r.squares" [square]=sq></picross-square>
  </div>
  `,
  providers: [ GridService ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  squares: Square[];
  rows: Line[];
  width: number = 5;
  height: number = 5;

  constructor(private gridService: GridService) {}

  getGrid(): void {
    this.gridService.setSize(this.width, this.height)
      .then(() => this.gridService.getGrid())
      .then(squares => this.squares = squares)
      .then(() => this.gridService.getRows())
      .then(rows => this.rows = rows);
  }

  ngOnInit(): void {
    this.getGrid();
  }
}
