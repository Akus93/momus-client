import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {PostService} from "../../services/post/post.service";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  image: any;
  title: string;
  tags: string[];
  errors: any;

  constructor(private authService: AuthService, private postService: PostService, public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.errors = {
      image: '',
      title: '',
      tags: '',
    };
    this.tags = [];
  }

  public onSubmit(): void {
    let hasErrors = false;
    for (let field in this.errors)
      this.errors[field] = '';

    if(typeof this.image == "undefined") {
      this.errors.image = 'Musisz wybrać obrazek.';
      hasErrors = true;
    }

    if(this.title.length == 0) {
      this.errors.title = 'To pole jest wymagane.';
      hasErrors = true;
    } else {
      if (this.title.length > 64) {
        this.errors.title = 'Tytuł może zawierać maksymalnie 64 znaki.';
        hasErrors = true;
      }
    }
    if(!hasErrors) {
      this.postService.createPost(this.authService.getToken(), this.title, this.tags, this.image)
          .subscribe(
            response => {
              this.snackBar.open("Success", null, {
                duration: 6000
              });
            },
            error => this.showErrorsFromServer(error)
          );
    }

  }

  private showErrorsFromServer(error: JSON) {
    for (let field in error){
      this.errors[field] = error[field];
    }
  }

  changeImageListener($event) : void {
    this.readImage($event.target);
  }

  private readImage(input: any): void {
    let file: File = input.files[0];
    let fileReader: FileReader = new FileReader();
    fileReader.onloadend = (event) => {
      this.image = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  }
}
