import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AddPostService } from './add-post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {

  uuid = localStorage.getItem('uuid');

  addPostForm!: FormGroup;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _addPostService = inject(AddPostService);

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin(): void {
    this.addPostForm = this._fb.group({
      uuid: this.uuid,
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description: new FormControl('', [Validators.required, Validators.minLength(6)])
      
    });
  }

  validateForm(): any {
    if (this.addPostForm.invalid) {
      return Object.values(this.addPostForm.controls)
        .forEach(control => {
          control.markAsTouched();
        });
    }
  }

  addPost(): any {
    const data = this.addPostForm.value;

    console.log(data)
    return this._addPostService.addPost(data)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (response) => {
          this._router.navigate(['/home']);
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
