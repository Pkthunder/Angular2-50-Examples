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
    function AppComponent(http) {
        this.http = http;
        this.countries = [];
        this.getData();
    }
    AppComponent.prototype.getData = function () {
        var _this = this;
        this.http.get('../static/countries.json')
            .toRx()
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.onSuccess(data); }, function (err) { return _this.onError(err); });
    };
    AppComponent.prototype.onSuccess = function (data) {
        console.log('data', data);
        this.countries = data;
    };
    AppComponent.prototype.onError = function (err) {
        console.log(err);
    };
    AppComponent = __decorate([
        angular2_1.Component({ selector: 'my-app', viewInjector: [angular2_2.httpInjectables] }),
        angular2_1.View({
            templateUrl: './templates/ex23/ex23.html',
            directives: [angular2_1.NgFor]
        }), 
        __metadata('design:paramtypes', [angular2_2.Http])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
angular2_1.bootstrap(AppComponent);
