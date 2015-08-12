import {Component, View, bootstrap, NgFor} from 'angular2/angular2';

import {Http, httpInjectables} from 'angular2/angular2';

let template = require('./ex27.html');

@Component({selector: 'example27', viewInjector: [httpInjectables]})
@View({ 
  template: template,
  directives: [NgFor]
})

export class App27 {
	countries: Array<Object> = [];

	constructor(public http: Http) {
		this.getData();
	}
	getData() {
		this.http.get('/app/components/examples/ex27/countries.json')
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