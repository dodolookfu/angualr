import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

const routes: Routes = [
  //路由器将会把 URL 匹配到 path: 'heroes'，并显示 HeroesComponent。
  {path:'heroes', component:HeroesComponent},
  {path:'dashboard', component:DashboardComponent},
  { path: 'detail/:id', component: HeroDetailComponent },
  //預設路由
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  //初始化路由器，并让它开始监听浏览器中的地址变化
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }

// 典型的 Angular 路由（Route）有两个属性：
// path：一个用于匹配浏览器地址栏中 URL 的字符串。
// component：当导航到此路由时，路由器应该创建哪个组件。