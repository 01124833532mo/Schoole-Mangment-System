import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IUser } from '../models/IUser';
import { IUserLogin } from '../models/IUserLogin';
import { jwtDecode } from 'jwt-decode';
import { IPayload2 } from '../models/IUserDataToken';

@Injectable({
  providedIn: 'root',
})
export class AccountServic {
  private baseurl = 'https://localhost:7073/api/Auth/';
  http = inject(HttpClient);
  isLogged = signal(false);
  username = signal('');
  isAdmin = signal(false);
  isTeacher = signal(false);
  isStudent = signal(false);

  register(user: IUser) {
    return this.http.post<{
      token: string;
      expiresAt: string;
      email: string;
      userName: string;
    }>(this.baseurl + 'register', user);
  }

  login(user: IUserLogin) {
    return this.http.post<{
      token: string;
      expiresAt: string;
      email: string;
      userName: string;
    }>(this.baseurl + 'login', user);
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
    const data = jwtDecode<IPayload2>(token);
    this.username.set(data.name ?? '');
    this.isLogged.set(true);
  }

  readToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
    this.isLogged.set(false);
  }

  isTokenExpired() {
    const token = this.readToken();
    if (!token) {
      return true;
    }
    const d = jwtDecode(token);
    if (!d?.exp) {
      return true;
    }
    const ctime = Math.floor(Date.now() / 1000);
    return d.exp < ctime;
  }
}
