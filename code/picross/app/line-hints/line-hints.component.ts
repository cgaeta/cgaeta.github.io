import { Component, Input } from '@angular/core';

import { Hint }     from '../hint';

@Component({
    moduleId: module.id,
    selector: 'line-hints',
    templateUrl: 'line-hints.component.html',
    styleUrls: ['line-hints.component.css']
})
export class LineHintsComponent {
  @Input()
  hints: Hint[];
  @Input()
  max: number;
  newHint: number;

  addHint(): void {
    let h: Hint = { num : this.newHint, completed: false };
    this.hints.push(h);
    this.newHint = null;
  }

  isDisabled(): boolean {
    return this.hasZero() || this.isMaxed();
  }

  hasZero(): boolean {
    return this.hints.filter((h) => h.num < 1).length > 0;
  }

  countHints(): number {
    let n = this.hints.length ? this.hints.length - 1 : 0;
    for (let i = 0; i < this.hints.length; i++) {
      n += this.hints[i].num;
    }
    return n;
  }

  isMaxed(): boolean {
    return this.countHints() === this.max;
  }

  remaining(): number {
    return this.max - this.countHints();
  }

  adjustValue(): void {
    this.newHint = Math.min(this.remaining(), this.newHint);
  }

  remove(h: Hint): void {
    this.hints = this.hints.filter((hint) => h !== hint);
  }
}
