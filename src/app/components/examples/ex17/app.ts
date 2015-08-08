import {Component, View, bootstrap, NgFor, formDirectives} from 'angular2/angular2';

// Use webpack's `require` to get files as a raw string using raw-loader
let template = require('./ex17.html');

@Component({selector: 'example17'})
@View({ 
  template: template,
  directives: [NgFor, formDirectives]
})
export class App17 {
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

	removeName(name, e) {
		e.preventDefault();
		var i = this.names.indexOf(name);
		this.names.splice(i,1);
	}

}