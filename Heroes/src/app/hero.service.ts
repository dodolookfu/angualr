import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero';
import { HEROES } from './mock-heros';
import { of,Observable } from 'rxjs';
import { MessageService } from './message.service'; //注入訊息
import { HttpClient, HttpHeaders } from '@angular/common/http'; //http 功能模組
import { catchError, map, tap } from 'rxjs/operators';
//注入使用 提供給任何HERO想要的訊息，使VIEW能夠專注於呈現 而不是邏輯
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // 所有的 HttpClient 都返回 RxJS Observable
  // Observable 可以在一段時間內返回多個值。但來自HttpClient的Observable總是發出一個值，然後結束，再也不會發出其它值。
  // HttpClient.get默認情況下把響應體當做無類型的JSON對象進行返回。如果指定了可選的模板類型<Hero[]>，就會給返回你一個類型化的對象

  // getHeroes() : Hero[] { return HEROES };
  getHeroes() : Observable<Hero[]> {
    //this.messageService.add('Get heroes list already'); //加入訊息
    return of (HEROES).pipe(
      tap(heroes => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
  }

  //改為http的方法
  // getHeroes(): Observable<Hero[]>{
  //   return this.http.get<Hero[]>(this.heroesUrl);
  // }

  getHero(id:number): Observable<Hero> {    
    //this.messageService.add(`Get heroe id=${id}`);
    return of(HEROES.find(hero => hero.id=== id)).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero:Hero): Observable<any>{    
    for(let i in HEROES){
      if(HEROES[i].id == hero.id){
        //this.messageService.add(`update id ${hero.id} hero.name to ${hero.name}`); //加入訊息
        HEROES[i] = hero;
        return of(hero).pipe(
          tap(_ => this.log(`updated hero id=${hero.id} and name=${hero.name}`)),
          catchError(this.handleError<any>('updateHero'))
        );
      }
    }
  }

  addHero(hero :Hero): Observable<Hero>{    
    var id = HEROES.length > 0 ? HEROES[HEROES.length-1].id+1 : 11;        
    hero.id= id;
    //HEROES.push(hero);
    return of(hero).pipe(
      tap(_ => this.log(`add hero id=${hero.id} and name=${hero.name}`)),
      catchError(this.handleError<any>('updateHero'))
    );
    //this.messageService.add(`add hero = id ${hero.id} name ${hero.name}`); //加入訊息
    
  }

  deleteHero(hero :Hero): Observable<Hero>{
    for(let i in HEROES){
      if(HEROES[i].id == hero.id){
        //this.messageService.add(`delete hero = id ${hero.id} name ${hero.name}`); //加入訊息     
        HEROES.splice(Number(i),1);
        return of(hero).pipe(
          tap(_ => this.log(`delete hero id=${hero.id} and name=${hero.name}`)),
          catchError(this.handleError<any>('updateHero'))
        );
      }
    }
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()){
      return of([]);
    }
    return of(HEROES.filter(hero => (hero.name.indexOf(term)>-1))).pipe(
      tap(_ => this.log(`search string is ${term}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // 定義:base/:collectionName 的形式
  // 而 collectionName 是 in-memory-data-service.ts 中的列表。

  //private heroesUrl = 'api/heroes'; //API的URL

  private log(message:string){
    this.messageService.add(`${message}`)
  }

  constructor(private http: HttpClient,
              private messageService : MessageService) { }
}
