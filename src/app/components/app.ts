/// <reference path="../../typings/_custom.d.ts" />

/*
 * Angular 2
 */
import {Component, View} from 'angular2/angular2';
import {Router, RouteConfig} from 'angular2/router';

/*
 * Directives
 */
import {coreDirectives, formDirectives} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';
// Import all of our custom app directives
import {appDirectives} from '../directives/directives';

// Custom directive for source code viewing
import {Code} from './code';

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
import {App9} from './examples/ex09/app';
import {App10} from './examples/ex10/app';
import {App11} from './examples/ex11/app';
import {App12} from './examples/ex12/app';
import {App13} from './examples/ex13/app';
import {App14} from './examples/ex14/app';
import {App15} from './examples/ex15/app';
import {App16} from './examples/ex16/app';
import {App17} from './examples/ex17/app';
import {App18} from './examples/ex18/app';
import {App19} from './examples/ex19/app';
import {App20} from './examples/ex20/app';
import {App21} from './examples/ex21/app';
import {App22} from './examples/ex22/app';
import {App23} from './examples/ex23/app';
import {App24} from './examples/ex24/app';
import {App25} from './examples/ex25/app';
import {App26} from './examples/ex26/app';
import {App27} from './examples/ex27/app';
import {App28} from './examples/ex28/app';
import {App29} from './examples/ex29/app';
import {App30} from './examples/ex30/app';

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
    appDirectives,

    // Custom source code directive
    Code
  ],
  // include our .css file
  styles: [ styles ],
  template: `
    <header>
      <div layout="row" class="top-nav ac-default-theme">
        <img src="public/angular-shield.png" alt="Angular2" height="54" width="54">
        <ul>
          <li class="l-left">
            <a [router-link]=" ['/home'] "class="top-nav-button ac-default-theme">Home</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/07'] "class="top-nav-button ac-default-theme">7</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/08'] "class="top-nav-button ac-default-theme">8</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/09'] "class="top-nav-button ac-default-theme">9</a>
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
          <li class="l-left">
            <a [router-link]=" ['/19'] "class="top-nav-button ac-default-theme">19</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/20'] "class="top-nav-button ac-default-theme">20</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/21'] "class="top-nav-button ac-default-theme">21</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/22'] "class="top-nav-button ac-default-theme">22</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/23'] "class="top-nav-button ac-default-theme">23</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/24'] "class="top-nav-button ac-default-theme">24</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/25'] "class="top-nav-button ac-default-theme">25</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/26'] "class="top-nav-button ac-default-theme">26</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/27'] "class="top-nav-button ac-default-theme">27</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/28'] "class="top-nav-button ac-default-theme">28</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/29'] "class="top-nav-button ac-default-theme">29</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/30'] "class="top-nav-button ac-default-theme">30</a>
          </li>
          <li class="l-left">
            <a [router-link]=" ['/31'] "class="top-nav-button ac-default-theme">31</a>
          </li>
        </ul>
      </div>
    </header>

    <main>
      <div>
        <div class="text-wrapper">
          <h3>Explanation</h3>
          Temp
        </div>
        <div class="outlet-wrapper">
          <h3>Example</h3>
          <router-outlet></router-outlet>
        </div>
      </div>
      <div class="list-wrapper">
        <div>
          <p>{{ TSfile }}</p>
          <textarea code="ts">{{ appCode }}</textarea>
        </div>
        <div>
          <p>{{ HTMLfile }}</p>
          <textarea code="html">{{ appCode }}</textarea>
        </div>
      </div>
    </main>

    <footer>
      WebPack Angular 2 Starter by <a href="https://twitter.com/AngularClass">@AngularClass</a>
    </footer>
  `
})
@RouteConfig([
  { path: '/',      as: 'home',    component: Home },
  { path: '/07',    as: '07',      component: App7 },
  { path: '/08',    as: '08',      component: App8 },
  { path: '/09',    as: '09',      component: App9 },
  { path: '/10',    as: '10',      component: App10 },
  { path: '/11',    as: '11',      component: App11 },
  { path: '/12',    as: '12',      component: App12 },
  { path: '/13',    as: '13',      component: App13 },
  { path: '/14',    as: '14',      component: App14 },
  { path: '/15',    as: '15',      component: App15 },
  { path: '/16',    as: '16',      component: App16 },
  { path: '/17',    as: '17',      component: App17 },
  { path: '/18',    as: '18',      component: App18 },
  { path: '/19',    as: '19',      component: App19 },
  { path: '/20',    as: '20',      component: App20 },
  { path: '/21',    as: '21',      component: App21 },
  { path: '/22',    as: '22',      component: App22 },
  { path: '/23',    as: '23',      component: App23 },
  { path: '/24',    as: '24',      component: App24 },
  { path: '/25',    as: '25',      component: App25 },
  { path: '/26',    as: '26',      component: App26 },
  { path: '/27',    as: '27',      component: App27 },
  { path: '/28',    as: '28',      component: App28 },
  { path: '/29',    as: '29',      component: App29 },
  { path: '/30',    as: '30',      component: App30 },
  { path: '/31',    as: '31',      component: Home }
])
export class App {
  name: string;
  TSfile: string;
  HTMLfile: string;
  lastUrl: string;

  constructor(public router: Router) {
    // grabs current example number
    var url = window.location.href;
    url = url.split('://')[1];
    var exNum = url.split('/')[1];

    // sets template variables
    this.name = 'angular'; // used in logo
    this.TSfile = 'app.ts';
    this.HTMLfile = 'ex' + exNum + '.html';

    // reloads page on router navigation to update file displays
    this.lastUrl = window.location.href;
    this.router.subscribe( () => this.isNext() );

    console.log("hello!", this.router);
    this.print();

  }

  isNext() {
    if ( window.location.href !== this.lastUrl ) {
      location.reload();
    }
  }

  print() {
    console.log("hello!", this.router);
  }

}
