/// <reference path="../../typings/_custom.d.ts" />

/*
 * Angular 2
 */
import {Component, View} from 'angular2/angular2';
import {RouteConfig} from 'angular2/router';

/*
 * Directives
 */
import {coreDirectives, formDirectives} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';
// Import all of our custom app directives
import {appDirectives} from '../directives/directives';

/*
 * App Pipes
 * our collection of pipes registry
 */
import {appPipes} from '../pipes/pipes';

/*
 * Components
 */
// We use a folder if we want separate files
import {Home} from './home/home';

import {App7} from './examples/ex07/app';
import {App8} from './examples/ex08/app';

// Use webpack's `require` to get files as a raw string using raw-loader
let styles   = require('./app.css');

/*
 * App Component
 * Top Level Component
 * Simple router component example
 */
@Component({
  selector: 'app', // without [ ] means we are selecting the tag directly
  viewInjector: [ appPipes ]
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [
    // Angular's core directives
    coreDirectives,

    // Angular's form directives
    formDirectives,

    // Angular's router
    routerDirectives,

    // Our collection of directives from /directives
    appDirectives
  ],
  // include our .css file
  styles: [ styles ],
  template: `
    <header>
      <div layout="row" class="top-nav ac-default-theme">
        <img src="angular-shield.png" alt="Angular2" height="54" width="54">
        <ul>
          <li class="l-left">
            <a [router-link]=" ['/home'] "class="top-nav-button ac-default-theme">Home</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/7'] "class="top-nav-button ac-default-theme">7</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/8'] "class="top-nav-button ac-default-theme">8</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/9'] "class="top-nav-button ac-default-theme">9</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/10'] "class="top-nav-button ac-default-theme">10</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/11'] "class="top-nav-button ac-default-theme">11</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/12'] "class="top-nav-button ac-default-theme">12</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/13'] "class="top-nav-button ac-default-theme">13</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/14'] "class="top-nav-button ac-default-theme">14</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/15'] "class="top-nav-button ac-default-theme">15</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/16'] "class="top-nav-button ac-default-theme">16</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/17'] "class="top-nav-button ac-default-theme">17</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/18'] "class="top-nav-button ac-default-theme">18</a>
          </li>
        </ul>
      </div>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      WebPack Angular 2 Starter by <a href="https://twitter.com/AngularClass">@AngularClass</a>
    </footer>
  `
})
@RouteConfig([
  { path: '/',      as: 'home',    component: Home },
  { path: '/7',     as: '7',       component: App7 },
  { path: '/8',     as: '8',       component: App8 },
  { path: '/9',     as: '9',       component: App8 },
  { path: '/10',    as: '10',      component: App8 },
  { path: '/11',    as: '11',      component: App8 },
  { path: '/12',    as: '12',      component: App8 },
  { path: '/13',    as: '13',      component: App8 },
  { path: '/14',    as: '14',      component: App8 },
  { path: '/15',    as: '15',      component: App8 },
  { path: '/16',    as: '16',      component: App8 },
  { path: '/17',    as: '17',      component: App8 },
  { path: '/18',    as: '18',      component: App8 }
])
export class App {
  name: string;
  constructor() {
    this.name = 'angular'; // used in logo
  }
}
