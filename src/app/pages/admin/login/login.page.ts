import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _loginService = inject(LoginService);

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin(): void {
    this.loginForm = this._fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  redirectTo(): any {
    return this._router.navigate(['/register']);
  }

  validateForm(): any {
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls)
        .forEach(control => { control.markAsTouched(); });
    }
  }

  loginUser(): any {
    const data = this.loginForm.value;
    return this._loginService.login(data)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('uuid', response.uuid)
        localStorage.setItem('user', JSON.stringify(response.user));
        this._router.navigate(['/dashboard']);
      }
      );
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  redirectToReset(){
    this._router.navigateByUrl('reset-password');
  }
}
