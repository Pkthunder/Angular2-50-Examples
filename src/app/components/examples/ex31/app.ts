import {Component, View, NgFor} from 'angular2/angular2';

import {Http, httpInjectables} from 'angular2/angular2';

import {defaultPipes} from 'angular2/angular2';

@Component({
	selector: 'example31', 
	viewInjector: [httpInjectables],
	viewBindings: [defaultPipes]
}) 
@View({ 
  templateUrl: '/app/components/examples/ex31/ex31.html',
  directives: [NgFor]
})

export class App31 {
	countries: Array<Object> = [];

	constructor(public http: Http) {
		console.log("constructor called!");
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