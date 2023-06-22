import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private token = localStorage.getItem('token') || '';

  private _router = inject(Router);

  canActivate(): boolean {

    if (this.token?.length > 0) {
      // El usuario está autenticado y puede acceder a la ruta
      return true;
    } else {
      // Redireccionar al usuario a la página de inicio de sesión si no está autenticado
      this._router.navigate(['/login']);
      // Bloquear el acceso a la ruta
      window.localStorage.clear();
      return false;
    }
  }
}
