/// <reference path="../../typings/angular2/angular2.d.ts" />

// All code based off of https://github.com/angular-class/angular2-webpack-starter/blob/master/src/app/pipes/CapitalizePipe.ts

import {Pipe, PipeFactory, NullPipeFactory} from 'angular2/angular2';

export function isValidEntry(txt): boolean {
	return (typeof txt === 'string' && !(this.regexp.test(txt))) ||
			typeof txt === 'number';
}

export class CurrencyPipe implements Pipe {
	// ensure string has only numerical characters
	regexp: RegExp = /[^0-9]/;

	supports(txt): boolean {
		return isValidEntry(txt);
	}
	transform(value: any, args?: List<any>): any {
		if ( typeof value === 'number' ) {
			value = value.toString();
		}

		return (!value) ? '' : this.toCurrency(value);
	}

	toCurrency(txt: string): string {
		return '$' + txt + '.00';
	}

	onDestroy(): void {
		// not needed since this is stateless
	}
}

export class CurrencyFactory implements PipeFactory {
	supports(txt): boolean {
		return isValidEntry(txt);
	}
	create(cdRef): Pipe {
		return new CurrencyPipe();
	}
}

// Since templates in angular are async we are passing the value to
// NullPipeFactory if the value is not supported
export var currency = [ new CurrencyFactory(), new NullPipeFactory() ];