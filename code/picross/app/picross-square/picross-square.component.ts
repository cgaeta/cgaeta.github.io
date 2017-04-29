import { Component, Input } from '@angular/core';

import { Square }           from '../square';

@Component({
    moduleId: module.id,
    selector: 'picross-square',
    templateUrl: 'picross-square.component.html',
    styleUrls: ['picross-square.component.css']
})
export class PicrossSquareComponent {
  @Input()
  square: Square;
}
