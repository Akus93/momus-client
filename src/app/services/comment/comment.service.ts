import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {DOMAIN} from "../../globals";
import {Comment} from "../../models/comment.model";



@Injectable()
export class CommentService {

  constructor(private http: Http) { }

  public getComments(slug: string): Observable<Comment[]> {

    let url = DOMAIN + '/api/comments/?post=' + slug;

    return this.http.get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    return Observable.throw(error.json());
  }

}
