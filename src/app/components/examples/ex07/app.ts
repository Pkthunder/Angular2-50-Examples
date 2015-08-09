import {Component, View, formDirectives} from 'angular2/angular2';

// Use webpack's `require` to get files as a raw string using raw-loader
let template = require('./ex07.html');

@Component({selector: 'example07'})
@View({ 
  template: template,
  directives: [formDirectives]
})

export class App7 {
	name: string;

	constructor() {
		this.name = '';
	}
}