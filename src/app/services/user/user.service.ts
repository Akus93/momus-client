import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

import { DOMAIN } from '../../globals';
import {UserProfile} from "../../models/user-profile";


@Injectable()
export class UserService {

  constructor(private http: Http) { }

  public createUser(username: string, email: string, password: string, confirmPassword: string): Observable<string> {

    let url = DOMAIN + '/auth/registration/';
    let body = JSON.stringify({username: username, email: email, password1: password, password2: confirmPassword });
    let options = {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, body, options)
      .map((res: Response) => res.json().key)
      .catch(this.handleError);
  }

  public getCurrentUserProfile(token: string): Observable<UserProfile> {

    let url = DOMAIN + '/api/users/my-profile/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token
      })
    };

    return this.http.get(url, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public patchCurrentUserProfile(token: string, username: string, body: any): Observable<UserProfile> {

    let url = DOMAIN + '/api/users/' + username + '/';
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Content-Type': 'application/json'
      })
    };

    return this.http.patch(url, JSON.stringify(body), options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public getUserProfile(username: string): Observable<UserProfile> {

    let url = DOMAIN + '/api/users/' + username +'/';

    return this.http.get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  public setUser(user: UserProfile): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  };

  public getUser(): UserProfile {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
