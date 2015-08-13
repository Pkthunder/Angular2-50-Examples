import {Component, View, NgFor, formDirectives} from 'angular2/angular2';

@Component({selector: 'example17'})

@View({ 
  templateUrl: '/app/components/examples/ex17/ex17.html',
  directives: [NgFor, formDirectives]
})

export class App17 {
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

	removeName(index: number, e: any) {
		e.preventDefault();
		this.names.splice(index,1);
	}
}