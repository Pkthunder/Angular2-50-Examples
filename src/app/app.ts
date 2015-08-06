/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/angular2/router.d.ts" />

// Angular 2
import {Component, View, bootstrap} from 'angular2/angular2';

// Router
import {RouteConfig, RouterOutlet, RouterLink} from 'angular2/router';

// Components for Router
import {Home} from './home';
import {App7} from '../../examples/ex07/app';

@Component({
	selector: 'app'
})

@View({
	directives: [RouterOutlet, RouterLink],
	template:	`<header>Hello {{ name }}</header>
				<div><ul><li><a [router-link]="['/example07']">
				Example 7</a></li></ul></div>
				<main><router-outlet></router-outlet></main>
				<footer>Special thanks to Curran and Jesse</footer>`
})


@RouteConfig([
	{ path: '/',	as: 'home',			component:Home },
	{ path: '/7',	as: 'example07',	component:App7 }
])

export class App {
	name: string;
	constructor() {
		this.name = 'Welcome Angular2!';
		console.log("constructor called");
	}
}

bootstrap(App);