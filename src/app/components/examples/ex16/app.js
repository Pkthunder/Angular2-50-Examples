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
var AppComponent = (function () {
    function AppComponent() {
        this.names = ['Larry', 'Curly', 'Moe'];
        this.newname = '';
    }
    AppComponent.prototype.addTo = function (name) {
        this.names.push(this.newname);
        this.newname = '';
        var that = this;
        //only clears with timeout call?
        setTimeout(function () {
            that.newname = '';
        }, 1);
    };
    AppComponent = __decorate([
        angular2_1.Component({ selector: 'my-app' }),
        angular2_1.View({
            templateUrl: './templates/ex16/ex16.html',
            directives: [angular2_1.NgFor, angular2_1.formDirectives]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
angular2_1.bootstrap(AppComponent);
