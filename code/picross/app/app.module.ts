import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';

import { AppComponent }             from './app.component';
import { PicrossSquareComponent }   from './picross-square/picross-square.component';
import { LineHintsComponent }       from './line-hints/line-hints.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    PicrossSquareComponent,
    LineHintsComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
