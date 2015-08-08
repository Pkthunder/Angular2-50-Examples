import {Component, View, bootstrap, formDirectives} from 'angular2/angular2';

// Use webpack's `require` to get files as a raw string using raw-loader
let template = require('./ex09.html');

@Component({selector: 'example09'})
@View({ 
  template: template,
  directives: [formDirectives]
})
export class App9 {
	firstName: string;
	lastName: string;

	constructor() {
		this.firstName = '';
		this.lastName = '';
	}
}