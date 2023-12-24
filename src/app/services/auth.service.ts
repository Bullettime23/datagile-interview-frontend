import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';

const localStorageToken = 'datagile-test-interview-token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isUserLoggedIn: boolean = false;

  constructor(private api: ApiService) {}

  loginById(id: string | null): Observable<boolean> {
    console.log('Trying to login with id: ', id);
    if (this.isUserLoggedIn) {
      return of(true);
    }
    if (localStorage.getItem(localStorageToken)) {
      this.isUserLoggedIn = true;
      return of(true);
    }

    if (id) {
      return this.api.getTokenById(id).pipe(
        tap((token) => {
          if (typeof token == 'string') {
            localStorage.setItem(localStorageToken, token);
          }
        }),
        map((responce) =>
          responce instanceof HttpErrorResponse ? false : true
        ),
        catchError(() => of(false))
      ) as Observable<boolean>;
    }

    return of(false);
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem(localStorageToken);
  }
}
