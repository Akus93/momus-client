import { Component, OnInit } from '@angular/core';
import {MdDialogRef, MdSnackBar} from "@angular/material";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {validateEmail} from "../../validators/validateEmail";


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup;
  nonFieldError: string;

  constructor(public dialogRef: MdDialogRef<LoginDialogComponent>, private authService: AuthService, private formBuilder: FormBuilder, public snackBar: MdSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, validateEmail]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  public onSubmit(): void {
    for (let field in this.errorMessages)
      this.errorMessages[field]['errors'] = [];

    if (this.loginForm.valid) {
      console.log('POPRAWNIE');
      this.login();
    }
    else {
      for (let field in this.errorMessages) {
        let ctrl = this.loginForm.get(field);
        if (ctrl.invalid) {
          let messages = this.errorMessages[field]['messages'];
          for (let key in ctrl.errors) {
            this.errorMessages[field]['errors'].push(messages[key]);
          }
        }
      }
    }
  }

  private login(): void {
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe(
        token => {
          this.authService.setToken(token);
          this.snackBar.open("Zalogowano się", null, {
            duration: 2000,
          });
          this.dialogRef.close();
        },
        error => this.showErrorsFromServer(error)
      );
  }

  private showErrorsFromServer(error: JSON): void {
    for (let field in error)
      if (field in this.errorMessages)
        this.errorMessages[field]['errors'] = error[field];
    this.nonFieldError = error['non_field_errors'][0] || '';
  }

  errorMessages = {
    'email': {
      'messages': {
        'required': 'To pole jest wymagane.',
        'validateEmail': 'Niepoprawny adres email.',
      },
      'errors': []
    },
    'password': {
      'messages': {
        'required': 'To pole jest wymagane.',
        'minlength':  'Hasło musi posiadać conajmniej 8 znaków.'
      },
      'errors': []
    },
  };

}
