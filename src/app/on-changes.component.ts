/* tslint:disable:forin */
import {
  Component, Input, OnChanges,
  SimpleChanges, ViewChild
} from '@angular/core';

class Hero {
  constructor(public name: string) {}
}

@Component({
  selector: 'on-changes',
  template: `
  <div class="hero">
    <p>{{hero.name}} can {{power}}</p>

    <h4>-- Change Log --</h4>
    <div *ngFor="let chg of changeLog">{{chg}}</div>
  </div>
  `,
  styles: [
    '.hero {background: LightYellow; padding: 8px; margin-top: 8px}',
    'p {background: Yellow; padding: 8px; margin-top: 8px}'
  ]
})
export class OnChangesComponent implements OnChanges {
  @Input() hero: Hero;
  @Input() power: string;

  changeLog: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  reset() { this.changeLog = []; }
}

@Component({
  selector: 'on-changes-parent',
  templateUrl: './on-changes-parent.component.html',
  styles: ['.parent {background: Lavender;}']
})
export class OnChangesParentComponent {
  hero: Hero;
  power: string;
  title = 'OnChanges';
  @ViewChild(OnChangesComponent) childView: OnChangesComponent;

  constructor() {
    this.reset();
  }

  reset() {
    // new Hero object every time; triggers onChanges
    this.hero = new Hero('Windstorm');
    // setting power only triggers onChanges if this value is different
    this.power = 'sing';
    if (this.childView) { this.childView.reset(); }
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/