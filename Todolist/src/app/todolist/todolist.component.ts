import { Component, OnInit } from '@angular/core';
import { TodolistService } from "../todolist.service";
import { TodoItem } from "../todo-item";
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  //主要列表
  todos : TodoItem[] = [];

  //輸入的新項目
  newTodo : string ='';

  constructor(private todolistService : TodolistService) { }

  ngOnInit() {
    this.getAllList();
  }

  //新增
  addTodo() : void{ //obj :HTMLInputElement
    console.log(this.newTodo);
    let todo = this.newTodo.trim()//obj.value.trim();
    if(todo){
      this.todolistService.addTodo(todo);
    }else{
      alert('輸入內容空白或有誤！');
    }
    this.newTodo = '';
  }

  //取得所有項目
  getAllList() : void{
    this.todos = this.todolistService.getAllList();
  }

  //取得待辦事項
  getTodoList() : void{
    this.todos = this.todolistService.getTodo();
  }

  //已完成清單
  getDoneList() : void{
    this.todos = this.todolistService.getDone();
  }

  //是否完成的toggle
  changeDone(id : number): void{
    this.todolistService.changeDone(id);
  }

  //刪除
  remove(id : number): void{
    this.todolistService.remove(id);
  }

  //修改
  update(todo: TodoItem, changeTodo : string) : void{
    let str = changeTodo.trim();
    if(str){
      this.todolistService.update(todo,changeTodo);
    }else{
      alert('修改內容有錯誤！')
    }
  }

  //取消修改
  cancelEditing(todo: TodoItem): void {
    this.todolistService.cancelEditing(todo);
  }

  //觸發修改框
  edit(todo: TodoItem): void {
    this.todolistService.edit(todo)   
  }

  //list數量
  getListLen() : Number{
    return this.todos.length;
  }

}
