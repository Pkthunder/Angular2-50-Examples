import {Component, View} from 'angular2/angular2';

import {NgFor} from 'angular2/angular2';

@Component({selector: 'example18'})

@View({ 
  templateUrl: '/app/components/examples/ex18/ex18.html',
  directives: [NgFor]
})

export class App18 {
	countries: Array<Object>;

	constructor() {
		this.countries = [
			{"name": "China", "population": 1359821000},
	      	{"name": "India", "population": 1205625000},
	      	{"name": "United States of America","population": 312247000}
		]
	}
}