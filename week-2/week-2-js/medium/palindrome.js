/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let nospacestr=str.toLowerCase().replace(/[^a-z]/g,'');
  return nospacestr.split('').reverse().join('') === nospacestr;
}

module.exports = isPalindrome;
