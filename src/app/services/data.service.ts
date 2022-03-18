import { Person } from './../data-model/person.model';
import { Injectable } from '@angular/core';
import { catchError, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GameResponse } from '../data-model/gameresponse.model';

@Injectable({
  providedIn: 'root'
})


export class DataService {

  constructor(private http: HttpClient) { }

  postUserDetails(person: Person): Observable<Person>{
    return this.http.post<Person>('http://api.plos.org/search?q=title:DNA', person)
    //return of(person)
  }

  getGamingTrends(): Observable <any> {  
    return this.http.get<any>('http://localhost:8082/trend/trending').pipe(
  //  return this.http.get<any>('http://api.plos.org/search?q=title:DNA').pipe(
      tap((value) => {
        console.log('service response', value);
      })
    );
  }
}
