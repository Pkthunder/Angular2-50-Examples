import {Component, View, formDirectives} from 'angular2/angular2';

@Component({selector: 'example11'})

@View({ 
  templateUrl: '/app/components/examples/ex11/ex11.html',
  directives: [formDirectives]
})

export class App11 {
	firstName: string;
	lastName: string;

	constructor() {
		this.firstName = 'John';
		this.lastName = 'Smith';
	}
}