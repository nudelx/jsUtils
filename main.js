var memo  = require('./memo.js');

var longFunction1 = function (args) {  console.log('looong function1 runnting  '); return args;}
var longFunction2 = function (args) {  console.log('looong function2 runnting  '); return args;}

var trick1 = memo.register(longFunction1);
var trick2 = memo.register(longFunction2);

console.log(trick1('test1'));
console.log(trick1('test1'));

console.log(trick2('test2'));
console.log(trick2('test2'));



/*******/


var compose = require('./partial.js');

const add  = function (x, y) {
  return x + y
}

const minus = function (x, y) {
  return x - y
}


var composedAddMinus = compose(add, minus);


console.log(composedAddMinus(2,3))
