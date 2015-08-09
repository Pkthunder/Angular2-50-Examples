// code based off https://github.com/angular-class/angular2-webpack-starter/blob/master/src/app/directives/Autofocus.ts
// and https://github.com/curran/screencasts/blob/gh-pages/introToAngular/exampleViewer/app.js

import {Directive, ElementRef} from 'angular2/angular2';

@Directive({
	selector: '[code]'
})

export class Code {
	constructor(public el: ElementRef) {
		var $ele = this.el.nativeElement;
		console.log($ele);
		var code = $ele.innerHTML;
	}
}