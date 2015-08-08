import {Component, View, bootstrap, formDirectives} from 'angular2/angular2';

// Use webpack's `require` to get files as a raw string using raw-loader
let template = require('./ex10.html');

@Component({selector: 'example10'})
@View({ 
  template: template,
  directives: [formDirectives]
})
export class App10 {
	firstName: string;
	lastName: string;

	constructor() {
		this.firstName = 'John';
		this.lastName = 'Smith';
	}
}