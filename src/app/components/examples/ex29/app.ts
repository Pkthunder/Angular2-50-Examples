import {Component, View, NgFor} from 'angular2/angular2';

import {Http, httpInjectables} from 'angular2/angular2';

@Component({
	selector: 'example29', 
	viewInjector: [httpInjectables]
})

@View({ 
  	templateUrl: '/app/components/examples/ex29/ex29.html',
  	directives: [NgFor]
})

export class App29 {
	countries: Array<Object> = [];

	constructor(public http: Http) {
		this.getData();
	}
	getData() {
		this.http.get('/app/components/examples/ex29/countries.json')
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