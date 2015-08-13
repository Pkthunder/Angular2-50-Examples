import {Component, View, NgFor, formDirectives} from 'angular2/angular2';

@Component({selector: 'example16'})

@View({ 
  templateUrl: '/app/components/examples/ex16/ex16.html',
  directives: [NgFor, formDirectives]
})

export class App16 {
	names: Array<string>;
	newname: string;

	constructor() {
		this.names = ['Larry', 'Curly', 'Moe'];
		this.newname = '';
	}

	addTo(name?: string) {
		this.names.push(this.newname);
		this.newname = '';
	}
}