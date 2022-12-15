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
];

export const randomChallenge = () => {
  return javascriptDefault[
    Math.floor(Math.random() * javascriptDefault.length)
  ];
};
