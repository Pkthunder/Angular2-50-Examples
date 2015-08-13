import {Component, View, NgFor} from 'angular2/angular2';

@Component({selector: 'example14'})

@View({ 
  templateUrl: '/app/components/examples/ex14/ex14.html',
  directives: [NgFor]
})

export class App14 {
	names: Array<string>;

	constructor() {
		this.names = ['Larry', 'Curly', 'Moe'];
	}
}