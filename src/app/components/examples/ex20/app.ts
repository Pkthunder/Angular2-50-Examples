import {Component, View, NgFor} from 'angular2/angular2';

import {Http, httpInjectables} from 'angular2/angular2';

@Component({
	selector: 'example20', 
	viewInjector: [httpInjectables]
})

@View({ 
  	templateUrl: '/app/components/examples/ex20/ex20.html',
  	directives: [NgFor]
})

export class App20 {
	countries: Array<Object> = [];

	constructor(public http: Http) {
		this.getData();
	}

	//based off of https://github.com/angular-class/angular2-webpack-starter/blob/master/src/app-simple/app.ts
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