import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from '../mock-heros'

import { HeroService } from '../hero.service'

//組件設定
@Component({
  selector: 'app-heroes', //css選擇器名稱
  templateUrl: './heroes.component.html', //html位置
  styleUrls: ['./heroes.component.css'] //CSS位置
})
export class HeroesComponent implements OnInit {

  hero : Hero = {
    id: 1,
    name: 'Windstorm'
  };

  //heroes = HEROES;
  heroes : Hero[];

  // selectedHero: Hero; //一開始沒預設所以錯誤 //意思是 selectedHero 的類型為 Hero
  // onSelect(hero : Hero): void {
  //   this.selectedHero = hero;
  // }
  //聲明一個名為heroService屬性為HeroService的注入點
  constructor(private heroService : HeroService) { }

  // 以下的方法是同步的，但是當伺服器需要時間進行處理時 會有些問題
  // getHeroes() : void {
  //   this.heroes = this.heroService.getHeroes();
  // }


  getHeroes() : void {
    //subscribe在伺服器響應後，回傳數據並賦予heroes
    this.heroService.getHeroes().subscribe(heroList => this.heroes = heroList)
  }

  add(name :string) : void {
    name = name.trim();
    if(!name){
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe(hero => this.heroes.push(hero));
  }

  delete(hero :Hero) : void {    
    this.heroService.deleteHero(hero).subscribe();
  }
  

  ngOnInit() {
    this.getHeroes(); //初始化時調用
  }
  
}

//在 Angular 中，組件扮演著控制器或視圖模型的角色，模板則扮演視圖的角色
//一般來說，括號間的素材是一個模板表達式，Angular 先對它求值，再把它轉換成字符串
//模板綁定是通過 property 和事件來工作的，而不是 attribute
//數據類型不是字符串時，就必須使用屬性綁定
//我們使用的html+ 都是綁定DOM的property 並非 HTML的attribute
//當property沒有對應的attribute時，利用[attr.名稱]的方式去設定

//下面來看一下那些最常用的內置指令。它們可分為屬性型指令 或 結構型指令
//屬性型指令會監聽和修改其它 HTML 元素或組件的行為、元素屬性（Attribute）、DOM 屬性（Property）。它們通常會作為 HTML 屬性的名稱而應用在元素上
//結構型指令的職責是 HTML 佈局。它們塑造或重塑 DOM 的結構，這通常是通過添加、移除和操縱它們所附加到的宿主元素來實現的
//NgIf 會從 DOM 中移除 HeroDetailComponent，並銷毀該組件及其所有子組件

//模板引用變量通常用來引用模板中的某個 DOM 元素，它還可以引用 Angular 組件或指令或Web Component

// 輸入屬性是一個帶有 @Input 裝飾器的可設置屬性。當它通過屬性綁定的形式被綁定時，值會“流入”這個屬性。 
// 輸出屬性是一個帶有 @Output 裝飾器的可觀察對象型的屬性。這個屬性幾乎總是返回 Angular 的EventEmitter。
// 當它通過事件綁定的形式被綁定時，值會“流出”這個屬性。 你只能通過它的輸入和輸出屬性將其綁定到其它組件 (將屬性綁定到指定組件中)
//ex. <app-hero-detail [hero]="currentHero" (deleteRequest)="deleteHero($event)">
//app-hero-detail中 @Input()  hero: Hero; @Output() deleteRequest = new EventEmitter<Hero>();
// 輸入屬性通常接收數據值。輸出屬性暴露事件生產者，如 EventEmitter 對象。 輸入和輸出這兩個詞是從目標指令的角度來說的

//有時候，綁定表達式可能會報類型錯誤，並且它不能或很難指定類型。要消除這種報錯，你可以使用 $any 轉換函數來把表達式轉換成 any 類型

//[(雙向綁向)]
//(監聽綁定)
//[屬性綁定] 類似prop父傳子的概念

//npm install angular-in-memory-web-api --save 安装这个内存 Web API 包
//ng generate module app-routing --flat --module=app
//--flat 把文件放入 src/app 中，而不是單獨目錄。
//--module=app 告訴 CLI 把他註冊進 AppModule 的 imports 裡面

//ng generate service message 產生服務
//ng generate component messages 產生組件

//$event 對象的屬性取決於 DOM 事件的類型。例如，鼠標事件與輸入框編輯事件包含了不同的信息。 所有標準 DOM 事件對像都有一個 target 屬性， 
// 引用觸發該事件的元素。在本例中，target 是<input> 元素， event.target.value 返回該元素的當前內容
// template: `
//   <input (keyup)="onKey($event)">
//   <p>{{values}}</p>
// `
// export class KeyUpComponent_v1 {
//   values = '';

//   onKey(event: any) { // without type info
//     this.values += event.target.value + ' | ';
//   }
// }

//可觀察對象支持在應用中的發布者和訂閱者之間傳遞消息。在需要進行事件處理、異步編程和處理多個值的時候，可觀察對象相對其它技術有著顯著的優點