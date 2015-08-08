import {Component, View, bootstrap, formDirectives} from 'angular2/angular2';

// Use webpack's `require` to get files as a raw string using raw-loader
let template = require('./ex12.html');

@Component({selector: 'example12'})
@View({ 
  template: template,
  directives: [formDirectives]
})
export class App12 {
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