import {Component, View, bootstrap, NgFor, formDirectives} from 'angular2/angular2';

// Use webpack's `require` to get files as a raw string using raw-loader
let template = require('./ex15.html');

@Component({selector: 'example15'})
@View({ 
  template: template,
  directives: [NgFor, formDirectives]
})
export class App15 {
	names: Array<string>;

	constructor() {
		this.names = ['Larry', 'Curly', 'Moe'];
	}

	addTo(name: string) {
		this.names.push(name);
	}
}