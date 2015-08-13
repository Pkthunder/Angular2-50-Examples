import {Component, View, NgFor} from 'angular2/angular2';

import {Http, httpInjectables} from 'angular2/angular2';

import {defaultPipes, formDirectives} from 'angular2/angular2';

@Component(
	{selector: 'example26', 
	viewInjector: [httpInjectables],
	viewBindings: [defaultPipes]
})

@View({ 
  	templateUrl: '/app/components/examples/ex26/ex26.html',
  	directives: [NgFor, formDirectives]
})

export class App26 {
	query: number;
	countries: Array<Object> = [];

	constructor(public http: Http) {
		this.query = 5; //defaults to 5
		this.getData();
	}
	getData() {
		this.http.get('/public/countries.json')
			.toRx()
			.map(res => res.json())
			.subscribe(data => this.onSuccess(data),
						err => this.onError(err)
			);
	}

	onSuccess(data) {
		console.log('data', data);
		this.countries = data;
	}

	onError(err) {
		console.log(err);
	}
}