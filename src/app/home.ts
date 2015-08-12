/// <reference path="../../typings/angular2/angular2.d.ts" />

// Angular 2
import {Component, View} from 'angular2/angular2';

@Component({
	selector: 'home'
})

@View({
	template: '<h1>Hello Angular2!</h1>'
})

export class Home {
	constructor(){
		
	}
}