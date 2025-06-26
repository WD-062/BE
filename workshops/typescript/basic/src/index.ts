console.log('Hello TypeScript');

let num = 6;

let myString = 'This is a string';

let bool = false;

let nullVal = null;

// let undef: undefined;

let anything: any = 'This can be reassigned';

anything = 6;

const numArray = [1, 2, 3, 4];

type Person = { name: string; age: number; yearBorn?: number | string };

const person: Person = {
  name: 'Steve',
  age: 72
};

const person2: Person = {
  name: 'Susan',
  age: 32
};

let numOrBool: number | boolean = 45;

numOrBool = false;

let stringOrBoolOrNum: string | boolean | number = 45;

stringOrBoolOrNum = '45';

// type RequestHandler = (req: Request, res: Response) => void;

const addNums = (num1: number, num2: number) => {
  return (num1 + num2).toString();
};

const logNums = (nums: number[]) => {
  nums.forEach(num => console.log(num));
};
// numOrBool = '43'
// num = 'Not anymore!';

// num.forEach(element => {
//   console.log(element);
// });
