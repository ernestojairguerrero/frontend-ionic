import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ProfileService } from './profile.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  uuid = localStorage.getItem('uuid');

  user = JSON.parse(localStorage.getItem('user'));

  editPostForm!: FormGroup;


  posts: any[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _profileService = inject(ProfileService);


  ngOnInit(): void {
    this.listPostsId();
    this.initFormLogin();
  }

  initFormLogin(): void {
    this.editPostForm = this._fb.group({
      name: new FormControl('', [ Validators.minLength(3)]),
      last_name: new FormControl('', [Validators.minLength(3)]),
      email: new FormControl('', [Validators.minLength(3)]),
    });
  }

  validateForm(): any {
    if (this.editPostForm.invalid) {
      return Object.values(this.editPostForm.controls)
        .forEach(control => {
          control.markAsTouched();
        });
    }
  }

  updatePost(): any {
    const data = this.editPostForm.value;
    return this._profileService
      .updatePost(this.uuid, data)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this.logout();
        }
      });
  }

  

  listPostsId() {
    const uuid = this.uuid;

    console.log(uuid);

    return this._profileService.listPostsId(uuid)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response: any) => {
          this.posts = response.posts;
          console.log(response);
        },
      });
  }

  deletePostId(id: any) {

    return this._profileService.deletePost(id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: () => {
          this.listPostsId();
        },
      });
  }

  logout() {
    window.localStorage.clear();
    return this._router.navigate(['/login']);
  }



  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
