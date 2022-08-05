import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { tap, pluck, catchError } from 'rxjs/operators';



import { TokenStorage } from 'src/app/token.storage';
import { User } from '../User';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
interface AuthResponse {
  token: string;
  user: User;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$ = new BehaviorSubject<User | null>(null);

  private apiUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient,private tokenStorage: TokenStorage) {}
  loginUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<AuthResponse>(url, user, httpOptions).pipe(
      tap(({ token, user }) => {
        this.setUser(user);
        this.tokenStorage.saveToken(token);
      }),
      pluck('user')
    );
  }
  addUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/users`;
    return this.http.post<AuthResponse>(url, user, httpOptions).pipe(
      tap(({ token, user }) => {
        this.setUser(user);
        this.tokenStorage.saveToken(token);
      }),
      pluck('user')
    );
  }
  setUser(user: User | null): void {
      this.user$.next(user);
  }

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }
}
