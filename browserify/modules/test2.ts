import IMyModule from "./IMyModule";

export interface StringValidator {
    isAcceptable(s: string): boolean;
}

export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

console.log(greeter(user));


const IMyModule = require('./IMyModule');

export default class MyModule implements IMyModule {
	val: string;
	constructor(val: string) {
		this.val = val;
	}
	isAcceptable(s: string): boolean {
		console.log('MyModule: isAcceptable', s);
		return true;
	}	
	test(str: string): boolean {
		console.log('MyModule: isAcceptable', str);
		return true;
	}
}