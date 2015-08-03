/// <reference path="../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap, NgFor, formDirectives, Control} from 'angular2/angular2';

@Component({selector: 'my-app'})
@View({ 
  templateUrl: './templates/ex17/ex17.html',
  directives: [NgFor, formDirectives]
})
export class AppComponent {
	names: Array<string>;
	newname: string;

	constructor() {
		this.names = ['Larry', 'Curly', 'Moe'];
		this.newname = ''
	}

	addTo(name?: string) {
		this.names.push(this.newname);
		this.newname = '';
		var that = this;
		//only clears with timeout call?
		setTimeout( function() {
			that.newname = '';
		}, 1);
	}

	removeName(name, e) {
		e.preventDefault(); //stops href from navigating - TODO: makes this better
		var i = this.names.indexOf(name);
		this.names.splice(i,1);
	}

}

bootstrap(AppComponent);