import {Component, View, NgFor, formDirectives} from 'angular2/angular2';

@Component({selector: 'example15'})

@View({ 
  templateUrl: '/app/components/examples/ex15/ex15.html',
  directives: [NgFor, formDirectives]
})

export class App15 {
	names: Array<string>;

	constructor() {
		this.names = ['Larry', 'Curly', 'Moe'];
	}

	addTo(name: string) {
		this.names.push(name);
	}
}