/// <reference path="../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';

// Annotation section
@Component({
  selector: 'quickstart1'
})
@View({
  template: '<h1>Hello {{ __name__ }}</h1>'
})
// Component controller
export class QuickStart1 {
  __name__: string;
  constructor() {
    this.__name__ = 'Jared';
  }
}