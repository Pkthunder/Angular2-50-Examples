/// <reference path="../../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, NgFor} from 'angular2/angular2';

import {Http, httpInjectables} from 'angular2/angular2';

@Component({selector: 'my-app', viewInjector: [httpInjectables]})
@View({ 
  templateUrl: './templates/ex19/ex19.html',
  directives: [NgFor]
})

export class AppComponent {
	countries: Array<Object>;
	people: any;

	constructor(public http: Http) {
		this.countries = [
			{"name": "China", "population": 1359821000},
	      	{"name": "India", "population": 1205625000},
	      	{"name": "United States of America","population": 312247000}
		];
		this.people = 'hi';
		console.log(this.people);
		this.getData();
		console.log(this.people);
	}
		
	/*getData() {
		this.http.get('../../static/countries.json'), {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).
		toRx().
		map(res => res.json()).
		subscribe(
			data => this.onSuccess(data),

			err => this.onError(err)
		);
	}*/
	getData() {
		this.http.get('countries.json')
			.toRx()
			.map(res => res.json())
			.subscribe(data => this.onSuccess(data),
						err => this.onError(err)
			);
	}

	onSuccess(data) {
		console.log('data', data);
	}

	onError(err) {
		console.log(err);
	}
}

bootstrap(AppComponent);