import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _apiUrl = environment.apiUrl;

  private _http = inject(HttpClient);

  private loginUser: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  // Login de usuario
  login(data: any): Observable<any> {
    return this._http.post(`${this._apiUrl}user/loginUser`, data)
      .pipe(
        tap(response => this.loginUser.next(response)),
        catchError(error => {
          if (error.error instanceof ErrorEvent) {
            error = `Error: ${error.error.message}`;
          } else {
            error = error;
          }
          return error;
        })
      );
  }
}
