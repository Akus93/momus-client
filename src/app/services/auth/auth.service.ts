import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

import { DOMAIN } from '../../globals';


var sessionStorage: any;

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  public login(email: string, password: string): Observable<string> {

    let url: string = DOMAIN + '/auth/login/';
    let body = JSON.stringify({email: email, password: password});
    let options = {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, body, options)
                    .map((res: Response) => res.json().key)
                    .catch(this.handleError);

  };

  public logout(): Observable<Response> {

    let url = DOMAIN + '/auth/logout/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ this.getToken(),
      })
    };
    return this.http.post(url, JSON.stringify({}), options)
  };

  public changePassword(oldPassword: string, newPassword1: string, newPassword2: string): Observable<any> {

    let url = DOMAIN + '/auth/password/change/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ this.getToken(),
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify({ old_password: oldPassword, new_password1: newPassword1, new_password2: newPassword2 });

    return this.http.post(url, body, options)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  public isAuth(): boolean {
    return !!sessionStorage.getItem('token');
  };

  public setToken(token: string): void {
    sessionStorage.setItem('token', token);
  };

  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  public clearSession(): void {
    sessionStorage.clear();
  }

  private handleError (error: Response ) {
    return Observable.throw(error.json());
  };

}
