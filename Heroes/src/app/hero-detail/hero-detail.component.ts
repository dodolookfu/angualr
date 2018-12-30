import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../heroes/hero';
//利用新的途徑獲取英雄詳細資料
//ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息。 这个组件对从 URL 中提取的路由参数感兴趣。
// 其中的 id 参数就是要显示的英雄的 id
import { ActivatedRoute } from '@angular/router'
//是一个 Angular 的服务，用来与浏览器打交道
import { Location } from '@angular/common'
import { HeroService } from '../hero.service'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  //@Input() hero : Hero; //一個帶有input裝飾器的hero屬性
  hero: Hero;

  getHero(): void {
    //取得id參數
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  ngOnInit() {
    this.getHero();
  }

  goBack(): void {
    this.location.back();
  }

  save() : void {
    this.heroService.updateHero(this.hero).subscribe();
    this.goBack();
  }
}
