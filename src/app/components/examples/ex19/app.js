/// <reference path="../../../typings/angular2/angular2.d.ts" />
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
var angular2_2 = require('angular2/angular2');
var AppComponent = (function () {
    function AppComponent() {
        this.countries = [
            { "name": "China", "population": 1359821000 },
            { "name": "India", "population": 1205625000 },
            { "name": "United States of America", "population": 312247000 }
        ];
    }
    AppComponent = __decorate([
        angular2_1.Component({ selector: 'my-app' }),
        angular2_1.View({
            templateUrl: './templates/ex19/ex19.html',
            directives: [angular2_2.NgFor]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
angular2_1.bootstrap(AppComponent);
