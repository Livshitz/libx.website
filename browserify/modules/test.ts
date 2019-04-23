import MyModule from "./test2";

// declare global {
//     interface Window { 
// 		test: any, 
// 		bx: any,
// 		libx: any,
// 	}
// }

interface Window {
	test: any,
	libx: any,
}

declare var libx: any;

// const test2 = require('./test2.ts');
// import * as test2 from './test2';

var foo = 20;
console.log("-- Half the number of widgets is " + (foo / 2));
// declare function greet(greeting: string): void;
// greet("hello, world");
class B {
	isAcceptable = function () {
        return false;
    };
}

export { B };

exports.x  = {
    test: function () {
        debugger;
		console.log('--- test 2!');
		

		enum Color {Red = 1, Green, Blue}
		let c: Color = Color.Green;
		console.log('color: ', c);

		let notSure: any = 4;
		notSure = "maybe a string instead";
		notSure = false; // okay, definitely a boolean


		function warnUser(): void {
			console.log("This is my warning message");
		}

		let someValue: any = "this is a string";

		let strLength: number = (someValue as string).length;

		return libx.browser.require('/resources/scripts/modules/test2.js');
	},
	// test2: test2,
	test3: new MyModule('heya3'),
    bx: new B(),
};

