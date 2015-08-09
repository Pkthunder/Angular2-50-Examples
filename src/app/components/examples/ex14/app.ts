import {Component, View, bootstrap, NgFor} from 'angular2/angular2';

// Use webpack's `require` to get files as a raw string using raw-loader
let template = require('./ex14.html');

@Component({selector: 'example14'})
@View({ 
  template: template,
  directives: [NgFor]
})
export class App14 {
	names: Array<string>;

	constructor() {
		this.names = ['Larry', 'Curly', 'Moe'];
	}
}