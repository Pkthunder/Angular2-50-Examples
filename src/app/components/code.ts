/// <reference path="../../typings/codemirror.d.ts" />

// code based off https://github.com/angular-class/angular2-webpack-starter/blob/master/src/app/directives/Autofocus.ts
// and https://github.com/curran/screencasts/blob/gh-pages/introToAngular/exampleViewer/app.js

import {Directive, ElementRef, Http} from 'angular2/angular2';

@Directive({
	selector: '[code]'
})

export class Code {
	$ele: any;
	filePath: string;
	exNum: string;

	constructor(public el: ElementRef, public http: Http) {
		// grabs current example number
	    var url = window.location.href;
	    url = url.split('://')[1];
	    this.exNum = url.split('/')[1];


		this.$ele = this.el.nativeElement;
		console.log(this.$ele);
		console.log("code" in this.$ele.attributes);
		this.filePath = '/app/components/examples/';

		// defaults
		var fType = "text/typescript";
		var fName = "app.ts";

		// handle data pass to directive via template (code="data")
		if (this.$ele.attributes["code"].nodeValue === "html") {
			fType = "htmlmixed";
			fName = "ex" + this.exNum + ".html";
		}
		// handle data pass to directive via template (code="text")
		else if (this.$ele.attributes["code"].nodeValue === "text") {
			fType = "text/plain";
			fName = "info.txt";
		}

		this.getFile(fType, fName);
	}

	getFile(fileType: string, fileName: string) {

		//based off of https://github.com/angular-class/angular2-webpack-starter/blob/master/src/app-simple/app.ts
		this.http.get(this.filePath + 'ex' + this.exNum + '/' + fileName)
			.toRx()
			.map(res => res.text())
			.subscribe(data => this.onSuccess(data, fileType),
						err => this.onError(err)
			);
	}

	onSuccess(data, fileType: string) {
		//console.log('data', data);
		//this.$ele.innerHTML = data;
		var cm = CodeMirror.fromTextArea(this.$ele, {
			lineNumbers: ((fileType === "text/plain") ? false : true),
			mode: fileType,
			viewportMargin: Infinity,
			readOnly: true,
			lineWrapping: ((fileType !== "text/plain") ? false : true)
		});
		cm.setValue(data);
	}

	onError(err) {
		console.log(err);
	}
}