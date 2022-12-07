const javascriptDefault = [
  ` 
  
/**
 * Given an array of numbers, create a new array where:
 * - each even numbers is multiplied by 100
 * - each odd number is replaced by -1
 *
 * For example:
 *
 * [1, 2, 3, 4] => [-1, 200, -1, 400]
 *
 */
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const transformNumbers = function (number) {
  /* WRITE YOUR CODE HERE */
  
  
};
console.log(numbers.map(transformNumbers));
`,
  `
/* 
    1. Complete the code below to have a function that returns the number of times
    it's been called.
    
    For example:
    - when you run it the first time, it should return 1
    - the second time, it should return 2
    - then 3
    - and so on

    Hint: you don't need to use loops
*/

function myCounter() { 
   /* WRITE YOUR CODE HERE */
}

console.log(myCounter()); // 1
console.log(myCounter()); // 2
console.log(myCounter()); // 3
`,
  `/* Write the function camelize(str) that changes 
  dash-separated words like “my-short-string” into 
  camel-cased “myShortString”.
*/

function camelize(str) {
  /* WRITE YOUR CODE HERE */

}


console.log(camelize("background-color"))
 console.log(camelize("list-style-image"))
console.log(camelize("-webkit-transition"))`,
];

export const randomChallenge = () => {
  return javascriptDefault[
    Math.floor(Math.random() * javascriptDefault.length)
  ];
};
