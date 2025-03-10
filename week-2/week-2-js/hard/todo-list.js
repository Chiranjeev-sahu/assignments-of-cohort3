/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(){
    this.items=[]
  }
  add(todo){
    this.items.push(todo);
  }
  remove(indexOfTodo){
    if (indexOfTodo>=0 && indexOfTodo<this.items.length){
      this.items.splice(indexOfTodo,1);
    }
    else{
      return "The index does not exist";
    }
  }
  update(index, updatedTodo){
    if (index>=0 && index<this.items.length){
      this.items[index]=updatedTodo;
    }
    else{
      return "The index does not exist";
    }
  }
  getAll(){
    return this.items;
  }
  get(indexOfTodo){
    if(indexOfTodo>=0 && indexOfTodo<this.items.length){
      return this.items[indexOfTodo];
    }
    return null;
  }
  clear(){
    this.items=[]
  }
}

module.exports = Todo;
