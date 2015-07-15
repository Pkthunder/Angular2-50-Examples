/// <reference path="../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, NgFor, formDirectives} from 'angular2/angular2';

@Component({selector: 'my-app'})
@View({ 
  templateUrl: './templates/ex15/ex15.html',
  directives: [NgFor, formDirectives]
})
class AppComponent {
	names: Array<string>;

	constructor() {
		this.names = ['Larry', 'Curly', 'Moe'];
	}

	addTo(name: string) {
		this.names.push(name);
	}

}

bootstrap(AppComponent);