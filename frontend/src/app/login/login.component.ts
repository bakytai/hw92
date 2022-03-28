import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginUserData } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent  {
  @ViewChild('f') form!: NgForm;
  // loading: Observable<boolean>;
  // error: Observable<null | LoginError>;
  constructor() { }


  onSubmit() {
    const userData: LoginUserData = this.form.value;
  }
}
