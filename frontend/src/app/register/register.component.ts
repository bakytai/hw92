import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { RegisterError, RegisterUserData } from '../models/user.model';
import { registerUserRequest } from '../store/users.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('f') form!: NgForm;

  error: Observable<null | RegisterError>;
  errorSub!: Subscription;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.error = store.select(state => state.users.registerError);
    this.loading = store.select(state => state.users.registerLoading);
  }

 ngAfterViewInit() {
   this.errorSub = this.error.subscribe(error => {
     if (error) {
       const msg = error.errors.email.message;
       this.form.form.get('email')?.setErrors({serverError: msg});
     } else {
       this.form.form.get('email')?.setErrors({});
     }
   });
 }

  onSubmit() {
    const userData: RegisterUserData = this.form.value;
    this.store.dispatch(registerUserRequest({userData}));
  }
}
