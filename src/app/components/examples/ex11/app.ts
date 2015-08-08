import {Component, View, bootstrap, formDirectives} from 'angular2/angular2';

// Use webpack's `require` to get files as a raw string using raw-loader
let template = require('./ex11.html');

@Component({selector: 'example11'})
@View({ 
  template: template,
  directives: [formDirectives]
})
export class App11 {
	firstName: string;
	lastName: string;

	constructor() {
		this.firstName = 'John';
		this.lastName = 'Smith';
	}
}