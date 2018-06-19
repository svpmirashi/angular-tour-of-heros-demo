import { Injectable, Optional } from '@angular/core';
import { Hero } from './hero';
import { HEROS } from './mock-heros';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { errorHandler } from '@angular/platform-browser/src/browser';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  //messageService: MessageService;
  private herosUrl = "api/heroes";

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { 
  }

  // getHeros() : Observable<Hero[]> {
  //   this.messageService.add('HeroService fetched heros..');
  //   return of(HEROS);
  // }

  getHeros() : Observable<Hero[]> {
    this.messageService.add('HeroService fetched heros..');
    return this.http
          .get<Hero[]>(this.herosUrl)
          .pipe( 
              tap(heroes => this.log(`Fetched heroes`)),
              catchError( this.handleError('getHeros', []) )
           );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return(error: any) : Observable<T> => {
        console.error(error);

        this.log(`${operation} failed: ${error.message}`);

        return of(result as T);
    };
  }

  getHero(id: number) : Observable<Hero> {
    //this.messageService.add(`HeroService: fetched hero id =  ${id}`);
    //return of(HEROS.find(hero => hero.id === id));
    const url = `${this.herosUrl}/${id}`;
    return this.http.get<Hero>(url)
              .pipe(
                tap(_ => this.log(`fetched hero id = ${id}`)),
                catchError(this.handleError<Hero>(`getHero id = ${id}`))
              );

  }


  updateHero(hero: Hero) : Observable<any> {
      return this.http.put(this.herosUrl, hero, httpOptions)
              .pipe(
                tap(_ => this.log(`updated hero id = ${hero.id}`)),
                catchError(this.handleError<any>( 'updateHero' ))
              );
  }

  addHero(hero: Hero): Observable<any>{
    return this.http.post(this.herosUrl, hero, httpOptions)
            .pipe(
              tap((hero: Hero) => this.log(`added hero w/ id = ${hero.id}`)),
              catchError(this.handleError<Hero>('addHero'))
            );
  }

  deleteHero(hero: Hero | number): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.herosUrl}/${id}`;
    //this.log(`about to hit url: ${url}`);
    return this.http.delete<Hero>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id = ${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  searchHeros(term: string): Observable<Hero[]>{
    if(!term.trim()){
        return of([]);
    }

    return this.http.get<Hero[]>(`${this.herosUrl}/name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>(`searchHeroes`,[]))
    );
  }

  private log(message: string): void{
    this.messageService.add('HeroService: ' + message);
  } 

}
