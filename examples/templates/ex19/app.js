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
        this.countries = [
            { "name": "China", "population": 1359821000 },
            { "name": "India", "population": 1205625000 },
            { "name": "United States of America", "population": 312247000 }
        ];
        this.people = 'hi';
        console.log(this.people);
        this.getData();
        console.log(this.people);
    }
    /*getData() {
        this.http.get('../../static/countries.json'), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).
        toRx().
        map(res => res.json()).
        subscribe(
            data => this.onSuccess(data),

            err => this.onError(err)
        );
    }*/
    AppComponent.prototype.getData = function () {
        var _this = this;
        this.http.get('countries.json')
            .toRx()
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.onSuccess(data); }, function (err) { return _this.onError(err); });
    };
    AppComponent.prototype.onSuccess = function (data) {
        console.log('data', data);
    };
    AppComponent.prototype.onError = function (err) {
        console.log(err);
    };
    AppComponent = __decorate([
        angular2_1.Component({ selector: 'my-app', viewInjector: [angular2_2.httpInjectables] }),
        angular2_1.View({
            templateUrl: './templates/ex19/ex19.html',
            directives: [angular2_1.NgFor]
        }), 
        __metadata('design:paramtypes', [angular2_2.Http])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
angular2_1.bootstrap(AppComponent);
