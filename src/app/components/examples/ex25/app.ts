import {Component, View, bootstrap, NgFor} from 'angular2/angular2';

import {Http, httpInjectables} from 'angular2/angular2';

let template = require('./ex25.html');

@Component({selector: 'example25', viewInjector: [httpInjectables]})
@View({ 
  template: template,
  directives: [NgFor]
})

export class App25 {
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