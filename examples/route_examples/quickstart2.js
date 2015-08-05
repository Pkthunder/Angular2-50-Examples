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
// Annotation section
var QuickStart2 = (function () {
    function QuickStart2() {
        this.__name__ = 'Curran';
    }
    QuickStart2 = __decorate([
        angular2_1.Component({
            selector: 'quickstart2'
        }),
        angular2_1.View({
            template: '<h1>Hello {{ __name__ }}</h1>'
        }), 
        __metadata('design:paramtypes', [])
    ], QuickStart2);
    return QuickStart2;
})();
exports.QuickStart2 = QuickStart2;
