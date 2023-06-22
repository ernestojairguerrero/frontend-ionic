import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _apiUrl = environment.apiUrl;

  private posts: BehaviorSubject<any> = new BehaviorSubject(null);

  private _http = inject(HttpClient);

  get listPostsId$(): Observable<any> { return this.posts.asObservable(); }


  listPostsId(uuid: string): Observable<any> {
    return this._http.get(`${this._apiUrl}post/list-id?uuid=${uuid}`,)
      .pipe(
        tap((posts: any) => {
          if(posts.status == 200){
            return this.posts.next(posts);
          }else{
            return console.log('No hay posts');
          }
        } ),
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

  updatePost(uuid: string, data: any): Observable<any> {
    return this._http.put(`${this._apiUrl}post/update?uuid=${uuid}`, data)
      .pipe(
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

  deletePost(id: any): Observable<any> {
    return this._http.delete(`${this._apiUrl}post/delete?id=${id}`)
      .pipe(
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
