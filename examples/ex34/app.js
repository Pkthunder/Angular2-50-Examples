/// <reference path="../../../typings/angular2/angular2.d.ts" />
/// <reference path="../../../typings/angular2/router.d.ts" />
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
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
// Router imports
var quickstart1_1 = require('../../route_examples/quickstart1');
var quickstart2_1 = require('../../route_examples/quickstart2');
var quickstart3_1 = require('../../route_examples/quickstart3');
var AppComponent = (function () {
    function AppComponent() {
        this.main = 'This is from app.ts';
    }
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app',
        }),
        angular2_1.View({
            templateUrl: './templates/ex34/ex34.html',
            directives: [router_1.RouterOutlet]
        }),
        router_1.RouteConfig([
            { path: '/', as: 'quickstart1', component: quickstart1_1.QuickStart1 },
            { path: '/2', as: 'quickstart2', component: quickstart2_1.QuickStart2 },
            { path: '/3', as: 'quickstart3', component: quickstart3_1.QuickStart3 },
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
angular2_1.bootstrap(AppComponent);
