import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post/post.service";
import {Post} from "../../models/post.model";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../../models/comment.model";
import {CommentService} from "../../services/comment/comment.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: Post;
  comments: Comment[];

  constructor(private route: ActivatedRoute, private postService: PostService, private commentService: CommentService) { }

  ngOnInit() {
    let getPost$ = this.route.params.switchMap(params => this.postService.getPost(params['slug']));
    getPost$.subscribe(
      post => {
        this.post = post;
        this.commentService.getComments(post.slug).subscribe(
          comments => this.comments = comments,
          error => console.error(error)
        );
      },
      error => console.error(error)
    );
  }

}
