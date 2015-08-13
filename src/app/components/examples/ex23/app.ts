import {Component, View, NgFor} from 'angular2/angular2';

import {Http, httpInjectables} from 'angular2/angular2';

import {defaultPipes} from 'angular2/angular2';

@Component({
	selector: 'example23', 
	viewInjector: [httpInjectables],
	viewBindings: [defaultPipes]
})

@View({ 
  templateUrl: '/app/components/examples/ex23/ex23.html',
  directives: [NgFor]
})

export class App23 {
	countries: Array<Object> = [];

	constructor(public http: Http) {
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