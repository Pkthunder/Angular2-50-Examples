import {Component, View, formDirectives} from 'angular2/angular2';

@Component({selector: 'example10'})

@View({ 
  templateUrl: '/app/components/examples/ex10/ex10.html',
  directives: [formDirectives]
})

export class App10 {
	firstName: string;
	lastName: string;

	constructor() {
		this.firstName = 'John';
		this.lastName = 'Smith';
	}
}