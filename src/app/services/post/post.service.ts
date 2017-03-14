import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {DOMAIN} from "../../globals";
import {PostResponse} from "../../models/post";

@Injectable()
export class PostService {

  constructor(private http: Http) { }

  public getActivePosts(): Observable<PostResponse> {

    let url = DOMAIN + '/api/posts/?isPending=False';

    return this.http.get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  public getPendingPosts(): Observable<PostResponse> {

    let url = DOMAIN + '/api/posts/?isPending=True';

    return this.http.get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  public createPost(token: string, title: string, tags: string[], image: string): Observable<any> {

    let url = DOMAIN + '/api/posts/';
    let body = JSON.stringify({ title: title, tags: tags, image: image });
    let options = {
      headers: new Headers({
        'Authorization': 'Token '+ token,
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(url, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
