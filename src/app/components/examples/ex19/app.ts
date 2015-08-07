/// <reference path="../../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';

import {NgFor} from 'angular2/angular2';

@Component({selector: 'my-app'})
@View({ 
  templateUrl: './templates/ex19/ex19.html',
  directives: [NgFor]
})

export class AppComponent {
	countries: Array<Object>;

	constructor() {
		this.countries = [
			{"name": "China", "population": 1359821000},
	      	{"name": "India", "population": 1205625000},
	      	{"name": "United States of America","population": 312247000}
		];
	}
}

bootstrap(AppComponent);