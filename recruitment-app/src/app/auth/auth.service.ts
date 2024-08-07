import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false; // Simulação para fins de exemplo

  login(username: string, password: string): Observable<boolean> {

    this.loggedIn = true;
    return of(true);
  }

  isAuthenticated(): Observable<boolean> {
    return of(this.loggedIn);
  }

}
