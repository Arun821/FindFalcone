import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Iplanets } from '../model/planets';
import { Ivehicles } from '../model/vehicle';
import { FindFalcone } from '../model/find';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private planetsUrl = "https://findfalcone.herokuapp.com/planets";
  private vehicleUrl = "https://findfalcone.herokuapp.com/vehicles";
  private tockenUrl = "https://findfalcone.herokuapp.com/token";
  private findFalconeUrl = "https://findfalcone.herokuapp.com/find";
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json"
    })
  }

  constructor(private http : HttpClient) { }

  
  getPlanets(): Observable<Iplanets[]> {
    return this.http.get<Iplanets[]>(this.planetsUrl).pipe(
      catchError(this.handleError)
    )
  }
  getVehicle():Observable<Ivehicles[]> {
    return this.http.get<Ivehicles[]>(this.vehicleUrl).pipe(
      catchError(this.handleError)
    )
  }
  getTocken(): Observable<any> {
    return this.http.post<string>(this.tockenUrl, " ", this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  findFalcone(find: FindFalcone): Observable<any> {
    console.log("FindFalcone in Api = ", find );
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
    };
    return this.http.post<string>(this.findFalconeUrl, find, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse){
    let errMsg = "";
    if (err.error instanceof ErrorEvent) {
      errMsg = `An error occurred: ${err.error.message}`;
    } else {
      errMsg = `Server returned code: ${err.status}, error message is: ${
        err.message
      }`;
    }
    console.error(errMsg);
    return throwError(errMsg);
  }
}
