import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {AuthService} from "../../services/auth/auth.service";
import {SignupDialogComponent} from "../signup-dialog/signup-dialog/signup-dialog.component";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public dialog: MdDialog, public authService: AuthService) { }

  ngOnInit() {
  }

  openLoginDialog(): void {
    let dialogRef = this.dialog.open(LoginDialogComponent, {width: '500px'});
    dialogRef.afterClosed().subscribe(
      result => {

      }
    );
  }

  openSignUpDialog(): void {
    let dialogRef = this.dialog.open(SignupDialogComponent, {width: '500px'});
    dialogRef.afterClosed().subscribe(
      result => {

      }
    );
  }

  logout(): void {
    this.authService.logout().subscribe(
      done => this.authService.clearSession(),
      error => {}
    );
  }

}
