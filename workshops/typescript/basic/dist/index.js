"use strict";
console.log('Hello TypeScript');
let num = 6;
let myString = 'This is a string';
let bool = false;
let nullVal = null;
// let undef: undefined;
let anything = 'This can be reassigned';
anything = 6;
const numArray = [1, 2, 3, 4];
const person = {
    name: 'Steve',
    age: 72
};
const person2 = {
    name: 'Susan',
    age: 32
};
let numOrBool = 45;
numOrBool = false;
let stringOrBoolOrNum = 45;
stringOrBoolOrNum = '45';
// type RequestHandler = (req: Request, res: Response) => void;
const addNums = (num1, num2) => {
    return (num1 + num2).toString();
};
const logNums = (nums) => {
    nums.forEach(num => console.log(num));
};
// numOrBool = '43'
// num = 'Not anymore!';
// num.forEach(element => {
//   console.log(element);
// });
