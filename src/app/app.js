/// <reference path="../../typings/angular2/angular2.d.ts" />
/// <reference path="../../typings/angular2/router.d.ts" />
if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Angular 2
var angular2_1 = require('angular2/angular2');
// Router
var router_1 = require('angular2/router');
// Components for Router
var home_1 = require('./home');
var app_1 = require('../../examples/ex07/app');
var App = (function () {
    function App() {
        this.name = 'Welcome Angular2!';
        console.log("constructor called");
    }
    App = __decorate([
        angular2_1.Component({
            selector: 'app'
        }),
        angular2_1.View({
            directives: [router_1.RouterOutlet, router_1.RouterLink],
            template: "<header>Hello {{ name }}</header>\n\t\t\t\t<div><ul><li><a [router-link]=\"['/example07']\">\n\t\t\t\tExample 7</a></li></ul></div>\n\t\t\t\t<main><router-outlet></router-outlet></main>\n\t\t\t\t<footer>Special thanks to Curran and Jesse</footer>"
        }),
        router_1.RouteConfig([
            { path: '/', as: 'home', component: home_1.Home },
            { path: '/7', as: 'example07', component: app_1.App7 }
        ]), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
})();
exports.App = App;
angular2_1.bootstrap(App);
