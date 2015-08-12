/// <reference path="../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, formDirectives} from 'angular2/angular2';

@Component({selector: 'my-app'})
@View({ 
  templateUrl: './templates/ex10/ex10.html',
  directives: [formDirectives]
})
class AppComponent {
	firstName: string;
	lastName: string;

	constructor() {
		this.firstName = 'John';
		this.lastName = 'Smith';
	}
}

bootstrap(AppComponent);