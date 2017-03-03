import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";

import {MaterialModule} from "@angular/material";

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import {AuthService} from "./services/auth/auth.service";
import {UserService} from "./services/user/user.service";
import {routes} from "./app.routing";
import { FooterComponent } from './components/footer/footer/footer.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginDialogComponent
  ]
})
export class AppModule { }
