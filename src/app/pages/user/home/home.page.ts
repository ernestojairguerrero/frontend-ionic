import { Component, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HomeService } from './home.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  posts: any[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  private _homeService = inject(HomeService);

  ngOnInit(): void {
    this.listPosts();
  }

  listPosts() {
    return this._homeService.listPosts()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response: any) => {
          this.posts = response.posts;
          console.log
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
