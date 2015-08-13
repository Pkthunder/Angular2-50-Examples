import {Component, View, formDirectives} from 'angular2/angular2';

@Component({selector: 'example13'})

@View({ 
  templateUrl: '/app/components/examples/ex13/ex13.html',
  directives: [formDirectives]
})

export class App13 {
	firstName: string;
	lastName: string;

	constructor() {
		this.firstName = 'John';
		this.lastName = 'Smith';
		this.delay(); //calling class method in constructor
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