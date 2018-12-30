import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

//當數據成功響應時，回傳訊息給主頁面
//Angular 只会绑定到组件的公共属性。
export class MessagesComponent implements OnInit {

  //必須為public 因為模組中將會綁定
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
