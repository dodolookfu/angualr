import { Injectable } from '@angular/core';
import { TodoItem } from "./todo-item";

@Injectable({
  providedIn: 'root'
})
export class TodolistService {

  //主要LIST
  private todolist : TodoItem[] = [];

  constructor() { }

  addTodo(todo: string): void{
    if(todo || todo.trim()){
      let id = this.todolist.length+1;      
      this.todolist.push({ id :id, content:todo, done: false, editModel: false});
    }
  }

  changeDone(id:number) : void{
    let todo = this.todolist.find((todo) => id == todo.id);
    todo.done = !todo.done;    
  }

  remove(id:number) : void{    
    let todo = this.todolist.find((todo) => id == todo.id);
    for(let i=0 ;i < this.todolist.length;i++){
      if(todo.id == this.todolist[i].id) {        
        this.todolist.splice(i,1);
      }
    }
  }

  update(todo: TodoItem, changeTodo : string) : void{
    let str = changeTodo.trim();
    if(str){
      todo.content = str;
      todo.editModel = false;
    }
  }

  cancelEditing(todo: TodoItem): void {
    todo.editModel = false;
  }

  edit(todo: TodoItem): void {    
    todo.editModel = true;
  }

  getAllList(): TodoItem[]{
    return this.todolist;
  }

  getTodo(): TodoItem[]{
    return this.todolist.filter(todo => !todo.done);
  }

  getDone(): TodoItem[]{
    return this.todolist.filter(todo => todo.done);
  }
}
