import {Component, View, bootstrap, formDirectives} from 'angular2/angular2';

// Use webpack's `require` to get files as a raw string using raw-loader
let template = require('./ex08.html');

@Component({selector: 'example07'})
@View({ 
  template: template,
  directives: [formDirectives]
})
export class App8 {
	name: string;

	constructor() {
		this.name = '';
	}
}