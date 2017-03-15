import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";

import {MaterialModule} from "@angular/material";

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {AuthService} from "./services/auth/auth.service";
import {UserService} from "./services/user/user.service";
import {routes} from "./app.routing";
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { SignupDialogComponent } from './components/signup-dialog/signup-dialog/signup-dialog.component';
import {PostService} from "./services/post/post.service";
import {MainComponent} from "./components/main/main.component";
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostComponent } from './components/post/post.component';
import {CommentService} from "./services/comment/comment.service";


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginDialogComponent,
    SignupDialogComponent,
    MainComponent,
    CreatePostComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    UserService,
    PostService,
    CommentService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginDialogComponent,
    SignupDialogComponent
  ]
})
export class AppModule { }
