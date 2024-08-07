import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuthenticated = this.checkAuthentication();

    if (isAuthenticated) {
      return true;
    } else {
      // Redireciona para a página de login e adiciona a URL de retorno como query parameter
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: this.router.url } });
    }
  }

  private checkAuthentication(): boolean {
    // Lógica para verificar se o usuário está autenticado
    return !!localStorage.getItem('authToken');
  }
}
