/// <reference path="../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, NgFor} from 'angular2/angular2';

@Component({selector: 'my-app'})
@View({ 
  templateUrl: './templates/ex14/ex14.html',
  directives: [NgFor]
})
class AppComponent {
	names: Array<string>;

	constructor() {
		this.names = ['Larry', 'Curly', 'Moe'];
	}

}

bootstrap(AppComponent);