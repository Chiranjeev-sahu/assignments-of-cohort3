/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor(){
    this.result=0;
  }
  add(value){
    
    value = String(value).trim(); 

    if (value === "" || isNaN(value)) {
      throw new Error("Invalid input: Please provide a valid number");
    }

    this.result += Number(value); // Convert and add to result
  }
  subtract(value){
    value = String(value).trim(); 

    if (value === "" || isNaN(value)) {
      throw new Error("Invalid input: Please provide a valid number");
    }

    this.result -= Number(value); // Convert and add to result
 
  }
  multiply(value){
    value = String(value).trim(); 

    if (value == null || isNaN(value) || value === "") {
      throw new Error("Invalid input: Please provide a valid number");
    }

    this.result *= Number(value); // Convert and add to result
 
  }
  divide(value){
    value = String(value).trim(); 

    if (value == null || isNaN(value) || value === "" ) {
      throw new Error("Invalid input: Please provide a valid number");
    }
    let numValue = Number(value);  // Convert to a number

    if(numValue===0){      
      throw new Error("Divide By Zero Error: Cannot divide by zero");
    }

    this.result /= Number(value); // Convert and add to result
     
  }
  clear(){
    this.result=0;
  }
  getResult(){
    return this.result;
  }
  calculate(expression){
    if (typeof expression !== "string") {
      throw new Error("Invalid input: Expression must be a string");
    }
    expression=expression.replace(/\s+/g,"")
    if (!/^[\d+\-*/().\s]+$/.test(expression)) {
      throw new Error("Invalid input: Expression contains invalid characters");
    }
    try {
      this.result= eval(expression);  // Evaluate the cleaned expression
      if (!isFinite(this.result)) { // Check for division by zero
        throw new Error("Divide By Zero Error: Cannot divide by zero");
      }
    }
    catch (error) {
      throw new Error("Invalid mathematical expression");
    }
  }
}
module.exports = Calculator;
