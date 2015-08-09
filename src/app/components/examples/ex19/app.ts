import {Component, View, bootstrap} from 'angular2/angular2';

import {NgFor} from 'angular2/angular2';

// Use webpack's `require` to get files as a raw string using raw-loader
let template = require('./ex19.html');

@Component({selector: 'example19'})
@View({ 
  template: template,
  directives: [NgFor]
})

export class App19 {
	countries: Array<Object>;

	constructor() {
		this.countries = [
			{"name": "China", "population": 1359821000},
	      	{"name": "India", "population": 1205625000},
	      	{"name": "United States of America","population": 312247000}
		];
	}
}