import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private _apiUrl = environment.apiUrl;

  private posts: BehaviorSubject<any> = new BehaviorSubject(null);

  private _http = inject(HttpClient);

  get listPostsId$(): Observable<any> { return this.posts.asObservable(); }


  listPosts(): Observable<any> {
    return this._http.get(`${this._apiUrl}post/list`,)
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

}
