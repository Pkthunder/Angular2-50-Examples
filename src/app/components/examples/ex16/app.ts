import {Component, View, bootstrap, NgFor, formDirectives, Control} from 'angular2/angular2';

// Use webpack's `require` to get files as a raw string using raw-loader
let template = require('./ex16.html');

@Component({selector: 'example16'})
@View({ 
  template: template,
  directives: [NgFor, formDirectives]
})
export class App16 {
	names: Array<string>;
	newname: string;

	constructor() {
		this.names = ['Larry', 'Curly', 'Moe'];
		this.newname = '';
	}

	addTo(name?: string) {
		this.names.push(this.newname);
		this.newname = '';
	}
}