import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MdDialogRef} from "@angular/material";
import {validateEmail} from "../../../validators/validateEmail";
import {validatePasswordConfirmation} from "../../../validators/validatePasswordConfirmation";

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MdDialogRef<SignupDialogComponent>) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, validateEmail]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });

    this.registrationForm.get('confirmPassword')
      .setValidators(validatePasswordConfirmation.bind(undefined, this.registrationForm.get('password')));
  }

  onSubmit(): void {
    let isValid: boolean = this.registrationForm.valid;
    // if (isValid) {
    //   this.userService.createUser(this.registrationForm.get('email').value,
    //     this.registrationForm.get('password').value,
    //     this.registrationForm.get('confirmPassword').value)
    //     .subscribe(
    //       token => {
    //         sessionStorage.setItem('token', token );
    //         this.eventsService.onLoggedIn$.emit(true);
    //         this.toastyService.success({
    //           title: "Sukces",
    //           msg: "Utworzyłeś/aś nowe konto",
    //           showClose: true,
    //           timeout: 7000,
    //           theme: 'default',
    //         });
    //         this.dialogRef.close();
    //         this.router.navigate(['/account']);
    //       },
    //       error => this.showErrorsFromServer(error)
    //     );
    // }
    // else
    //   for (let field in this.errorMessages) {
    //     this.errorMessages[field]['errors'] = [];
    //     let ctrl = this.registrationForm.get(field);
    //     if (ctrl.invalid) {
    //       let messages = this.errorMessages[field]['messages'];
    //       for (let key in ctrl.errors) {
    //         this.errorMessages[field]['errors'].push(messages[key]);
    //       }
    //     }
    //   }
  }

  private translateErrorResponse(error: JSON): {} {
    const translations = {
      'email': 'email',
      'password1': 'password',
      'password2': 'confirmPassword'
    };
    let result = {};
    for (let field in error){
      let newName: string = translations[field];
      result[newName] = error[field];
    }
    return result
  }

  private showErrorsFromServer(error: JSON) {
    const translatedError: {} = this.translateErrorResponse(error);
    for (let field in translatedError)
      if (field in this.errorMessages)
        this.errorMessages[field]['errors'] = translatedError[field];
  }

  errorMessages = {
    'email': {
      'messages': {
        'required':       'To pole jest wymagane.',
        'validateEmail':  'Niepoprawny adres email.'
      },
      'errors': []
    },
    'password': {
      'messages': {
        'required':   'To pole jest wymagane.',
        'minlength':  'Hasło musi posiadać conajmniej 8 znaków.',
      },
      'errors': []
    },
    'confirmPassword': {
      'messages': {
        'required':   'To pole jest wymagane.',
        'validateConfirmPassword':  'Hasła muszą być identyczne.',
      },
      'errors': []
    }
  };




}
