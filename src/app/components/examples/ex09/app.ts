import {Component, View, formDirectives} from 'angular2/angular2';

@Component({selector: 'example09'})

@View({ 
  templateUrl: '/app/components/examples/ex09/ex09.html',
  directives: [formDirectives]
})

export class App9 {
	firstName: string;
	lastName: string;

	constructor() {
		this.firstName = '';
		this.lastName = '';
	}
}