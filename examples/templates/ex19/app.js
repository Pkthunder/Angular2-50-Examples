/// <reference path="../../typings/angular2/angular2.d.ts" />
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
var fetch_1 = require('../../utils/fetch');
var fetchJson = (function () {
    function fetchJson() {
    }
    fetchJson.prototype.getJson = function () {
        return window.fetch('../static/countries.json', {
            method: 'GET',
            headers: {
                'Accept': 'appplication/json',
            }
        }).then(fetch_1.status).then(fetch_1.json);
    };
    return fetchJson;
})();
exports.fetchJson = fetchJson;
var AppComponent = (function () {
    function AppComponent($http) {
        var _this = this;
        this.countries = [
            { "name": "China", "population": 1359821000 },
            { "name": "India", "population": 1205625000 },
            { "name": "United States of America", "population": 312247000 }
        ];
        this.people = $http.getJson().then(function (response) {
            _this.people = response;
        });
        console.log(this.people);
    }
    AppComponent = __decorate([
        angular2_1.Component({ selector: 'my-app', injectables: [fetchJson] }),
        angular2_1.View({
            templateUrl: './templates/ex19/ex19.html',
            directives: [angular2_1.NgFor]
        }), 
        __metadata('design:paramtypes', [fetchJson])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
angular2_1.bootstrap(AppComponent);
