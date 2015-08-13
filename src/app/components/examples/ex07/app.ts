import {Component, View, formDirectives} from 'angular2/angular2';

@Component({selector: 'example07'})

@View({
	//path relative to the hosting html file
	templateUrl: '/app/components/examples/ex07/ex07.html',
	directives: [formDirectives]
})

export class App7 {
	name: string;

	constructor() {
		this.name = '';
	}
}