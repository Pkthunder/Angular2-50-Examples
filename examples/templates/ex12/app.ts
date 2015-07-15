/// <reference path="../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, formDirectives} from 'angular2/angular2';

@Component({selector: 'my-app'})
@View({ 
  templateUrl: './templates/ex12/ex12.html',
  directives: [formDirectives]
})
class AppComponent {
	firstName: string;
	lastName: string;

	constructor() {
		this.firstName = 'John';
		this.lastName = 'Smith';
	}

	delay() {
		var that = this; //saving this pointer for timeout
		setTimeout( function() {
			that.firstName = 'John Jacob';
			that.lastName = 'Jingleheimer Schmidt!';
			console.log('timeout returned');
		}, 3000);
	}

}

bootstrap(AppComponent);