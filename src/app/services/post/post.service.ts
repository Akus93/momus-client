import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {DOMAIN} from "../../globals";
import {Post} from "../../models/post";

@Injectable()
export class PostService {

  constructor(private http: Http) { }

  public getActivePosts(): Observable<Post[]> {

    let url = DOMAIN + '/api/posts/';

    return this.http.get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
