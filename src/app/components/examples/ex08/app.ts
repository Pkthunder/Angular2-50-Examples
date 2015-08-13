import {Component, View, formDirectives} from 'angular2/angular2';

@Component({selector: 'example08'})

@View({ 
  templateUrl: '/app/components/examples/ex08/ex08.html',
  directives: [formDirectives]
})

export class App8 {
	name: string;

	constructor() {
		this.name = '';
	}
}