/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    return str.toLowerCase().split('').reduce((count,char)=>{
      return 'aeiou'.includes(char)?count+1:count;
    },0)

}

module.exports = countVowels;