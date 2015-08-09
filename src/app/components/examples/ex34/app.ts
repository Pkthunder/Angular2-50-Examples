import {Component, View, bootstrap} from 'angular2/angular2';

import {RouteConfig, RouterOutlet} from 'angular2/router';

// Router imports
/*
import {QuickStart1} from '../../route_examples/quickstart1';
import {QuickStart2} from '../../route_examples/quickstart2';
import {QuickStart3} from '../../route_examples/quickstart3';
*/

@Component({
	selector: 'my-app',
}) 
@View({ 
  	templateUrl: './templates/ex34/ex34.html',
  	directives: [RouterOutlet]
})

export class AppComponent {
	main: string;

	constructor() {
		this.main = 'This is from app.ts';
	}

}