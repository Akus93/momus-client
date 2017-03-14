import { Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {CreatePostComponent} from "./components/create-post/create-post.component";


export const routes: Routes = [
  {
    path: 'create-post',
    component: CreatePostComponent
  },
  {
    path: '',
    component: MainComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
