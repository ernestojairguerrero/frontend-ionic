import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  private _apiUrl = environment.apiUrl;

  private postAdd: BehaviorSubject<any> = new BehaviorSubject(null);

  private _http = inject(HttpClient);

  get addPost$(): Observable<any> { return this.postAdd.asObservable(); }

  addPost(data: any): Observable<any> {
    return this._http.post(`${this._apiUrl}post/add`, data)
      .pipe(
        tap(response => this.postAdd.next(response)),
        catchError(error => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = error;
          }
          return error;
        })
      );
  }


}
