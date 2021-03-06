import {Component, View, bootstrap, NgFor} from 'angular2/angular2';

import {Http, httpInjectables} from 'angular2/angular2';

@Component({
	selector: 'my-app', 
	viewInjector: [httpInjectables]
}) 
@View({ 
  	templateUrl: './templates/ex33/ex33.html',
  	directives: [NgFor]
})

export class AppComponent {
	countries: Array<Object> = [];

	constructor(public http: Http) {
		this.getData();
	}
	getData() {
		this.http.get('./templates/ex33/countries.json')
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

bootstrap(AppComponent);