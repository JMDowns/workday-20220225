import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Villain } from './villain';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class VillainService {

  private villainsUrl = 'api/villains';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Villains from the server */
  getVillains(): Observable<Villain[]> {
    return this.http.get<Villain[]>(this.villainsUrl)
      .pipe(
        tap(_ => this.log('fetched Villains')),
        catchError(this.handleError<Villain[]>('getVillains', []))
      );
  }

  /** GET Villain by id. Return `undefined` when id not found */
  getVillainNo404<Data>(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/?id=${id}`;
    return this.http.get<Villain[]>(url)
      .pipe(
        map(Villains => Villains[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} Villain id=${id}`);
        }),
        catchError(this.handleError<Villain>(`getVillain id=${id}`))
      );
  }

  /** GET Villain by id. Will 404 if id not found */
  getVillain(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;
    return this.http.get<Villain>(url).pipe(
      tap(_ => this.log(`fetched Villain id=${id}`)),
      catchError(this.handleError<Villain>(`getVillain id=${id}`))
    );
  }

  /* GET Villains whose name contains search term */
  searchVillains(term: string): Observable<Villain[]> {
    if (!term.trim()) {
      // if not search term, return empty Villain array.
      return of([]);
    }
    return this.http.get<Villain[]>(`${this.villainsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found Villains matching "${term}"`) :
         this.log(`no Villains matching "${term}"`)),
      catchError(this.handleError<Villain[]>('searchVillains', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Villain to the server */
  addVillain(Villain: Villain): Observable<Villain> {
    return this.http.post<Villain>(this.villainsUrl, Villain, this.httpOptions).pipe(
      tap((newVillain: Villain) => this.log(`added Villain w/ id=${newVillain.id}`)),
      catchError(this.handleError<Villain>('addVillain'))
    );
  }

  /** DELETE: delete the Villain from the server */
  deleteVillain(id: number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;

    return this.http.delete<Villain>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Villain id=${id}`)),
      catchError(this.handleError<Villain>('deleteVillain'))
    );
  }

  /** PUT: update the Villain on the server */
  updateVillain(Villain: Villain): Observable<any> {
    return this.http.put(this.villainsUrl, Villain, this.httpOptions).pipe(
      tap(_ => this.log(`updated Villain id=${Villain.id}`)),
      catchError(this.handleError<any>('updateVillain'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a VillainService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`VillainService: ${message}`);
  }
}
