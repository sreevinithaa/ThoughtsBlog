import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { tap, pluck, catchError } from 'rxjs/operators';

import decode from 'jwt-decode';

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
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User | null>(null);

  private apiUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {}
  getProfile() :any|null{
    const token=this.tokenStorage.getToken();
    return token?decode(token):null;
  }
  loggedIn() {
    const token = this.tokenStorage.getToken();
    // If there is a token and it's not expired, return `true`
    return token  ? true : false;
  }

  isTokenExpired(token: string) {
    // Decode the token to get its expiration time that was set by the server
    const decoded: any = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      this.tokenStorage.signOut();
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }
  logoutUser() {
    this.tokenStorage.signOut();
  }
  
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
  getMe():User|null {
    let user:User|null=null;
    if(this.getProfile())
    {
     user=this.getProfile().data;
    }
   return user;
   
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
