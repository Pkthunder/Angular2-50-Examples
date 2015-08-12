/// <reference path="../../../typings/angular2/angular2.d.ts" />
/// <reference path="../../../typings/angular2/router.d.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';

import {RouteConfig, RouterOutlet} from 'angular2/router';

// Router imports
import {QuickStart1} from '../../route_examples/quickstart1';
import {QuickStart2} from '../../route_examples/quickstart2';
import {QuickStart3} from '../../route_examples/quickstart3';


@Component({
	selector: 'my-app',
}) 
@View({ 
  	templateUrl: './templates/ex34/ex34.html',
  	directives: [RouterOutlet]
})

// Each Config object follows the follwing pattern:
// path is the url path which you wish to navigate to each component
// as is the "@Component selector" to target (as seen above @ lines 12)
// component is the specific class to load (all imported above)
@RouteConfig([
	{path: '/',		as: 'quickstart1',		component: QuickStart1},
	{path: '/2',	as: 'quickstart2',		component: QuickStart2},
	{path: '/3',	as: 'quickstart3',		component: QuickStart3},
])

export class AppComponent {
	main: string;

	constructor() {
		this.main = 'This is from app.ts';
	}

}

bootstrap(AppComponent);