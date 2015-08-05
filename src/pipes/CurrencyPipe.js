/// <reference path="../../typings/angular2/angular2.d.ts" />
// All code based off of https://github.com/angular-class/angular2-webpack-starter/blob/master/src/app/pipes/CapitalizePipe.ts
var angular2_1 = require('angular2/angular2');
function isValidEntry(txt) {
    return (typeof txt === 'string' && !(this.regexp.test(txt))) ||
        typeof txt === 'number';
}
exports.isValidEntry = isValidEntry;
var CurrencyPipe = (function () {
    function CurrencyPipe() {
        // ensure string has only numerical characters
        this.regexp = /[^0-9]/;
    }
    CurrencyPipe.prototype.supports = function (txt) {
        return isValidEntry(txt);
    };
    CurrencyPipe.prototype.transform = function (value, args) {
        if (typeof value === 'number') {
            value = value.toString();
        }
        return (!value) ? '' : this.toCurrency(value);
    };
    CurrencyPipe.prototype.toCurrency = function (txt) {
        return '$' + txt + '.00';
    };
    CurrencyPipe.prototype.onDestroy = function () {
        // not needed since this is stateless
    };
    return CurrencyPipe;
})();
exports.CurrencyPipe = CurrencyPipe;
var CurrencyFactory = (function () {
    function CurrencyFactory() {
    }
    CurrencyFactory.prototype.supports = function (txt) {
        return isValidEntry(txt);
    };
    CurrencyFactory.prototype.create = function (cdRef) {
        return new CurrencyPipe();
    };
    return CurrencyFactory;
})();
exports.CurrencyFactory = CurrencyFactory;
// Since templates in angular are async we are passing the value to
// NullPipeFactory if the value is not supported
exports.currency = [new CurrencyFactory(), new angular2_1.NullPipeFactory()];
