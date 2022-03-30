import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUserData, RegisterUserData, User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  registerUser(uData: RegisterUserData) {

    return this.http.post<User>(environment.apiUrl + '/users', uData);
  }

  login(userData: LoginUserData) {
    return this.http.post<User>(environment.apiUrl + '/users/sessions', userData);
  }

  logout() {
    return this.http.delete(environment.apiUrl + '/users/sessions');
  }
}
