import {Component, View, NgFor} from 'angular2/angular2';

import {Http, httpInjectables} from 'angular2/angular2';

@Component({
	selector: 'example30', 
	viewInjector: [httpInjectables]
})

@View({ 
  templateUrl: '/app/components/examples/ex30/ex30.html',
  directives: [NgFor]
})

export class App30 {
	countries: Array<Object> = [];

	constructor(public http: Http) {
		this.getData();
	}
	getData() {
		this.http.get('/app/components/examples/ex30/countries.json')
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