/// <reference path="../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, NgFor} from 'angular2/angular2';
import {status, json} from '../../utils/fetch';

export class fetchJson {

	getJson() {
		return window.fetch('../static/countries.json', {
			method: 'GET',
			headers: {
				'Accept': 'appplication/json',
			}
		}).then(status).then(json);
	}
}

@Component({selector: 'my-app', injectables: [fetchJson]})
@View({ 
  templateUrl: './templates/ex19/ex19.html',
  directives: [NgFor]
})

export class AppComponent {
	countries: Array<Object>;
	people: any;

	constructor($http: fetchJson) {
		this.countries = [
			{"name": "China", "population": 1359821000},
	      	{"name": "India", "population": 1205625000},
	      	{"name": "United States of America","population": 312247000}
		];
		this.people = $http.getJson().then((response) => {
			this.people = response;
		});
		console.log(this.people);
	}

}

bootstrap(AppComponent);