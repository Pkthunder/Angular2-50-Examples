import {Component, View, formDirectives} from 'angular2/angular2';

@Component({selector: 'example12'})

@View({ 
  templateUrl: '/app/components/examples/ex12/ex12.html',
  directives: [formDirectives]
})

export class App12 {
	firstName: string;
	lastName: string;

	constructor() {
		this.firstName = 'John';
		this.lastName = 'Smith';
		//this.delay(); names won't change without function call
	}

	// App12 method (member function) which will change the
	// first and last name variables on a delay
	delay() {
		var that = this; //saving this pointer for timeout
		setTimeout( function() {
			that.firstName = 'John Jacob';
			that.lastName = 'Jingleheimer Schmidt!';
			console.log('timeout returned');
		}, 3000);
	}

}