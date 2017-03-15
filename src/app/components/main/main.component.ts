import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post/post.service";
import {PostResponse} from "../../models/post.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  postsResponse: PostResponse;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getActivePosts()
        .subscribe(
          postsResponse => this.postsResponse = postsResponse,
          error => console.error(error)
        );
  }

}
