/// <reference path="../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, formDirectives} from 'angular2/angular2';

@Component({selector: 'my-app'})
@View({ 
  templateUrl: './templates/ex07/ex07.html',
  directives: [formDirectives]
})
class AppComponent {
	name: string;

	constructor() {
		this.name = '';
	}
	
}

bootstrap(AppComponent);