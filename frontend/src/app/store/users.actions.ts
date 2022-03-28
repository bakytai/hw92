import { createAction, props } from '@ngrx/store';
import { LoginError, LoginUserData, RegisterError, RegisterUserData, User } from '../models/user.model';

export const registerUserRequest = createAction(
  '[User] Register Request',
  props<{userData: RegisterUserData}>()
);
export const registerUserSuccess = createAction(
  '[User] Register Success',
  props<{user: User}>()
);
export const registerUserFailure = createAction(
  '[User] Register Failure',
  props<{error: null | RegisterError}>()
);

export const loginUserRequest = createAction(
  '[Users] Login Request',
  props<{userData: LoginUserData}>()
);
export const loginUserSuccess = createAction(
  '[Users] Login Success',
  props<{user: User}>()
);
export const loginUserFailure = createAction(
  '[Users] Login Failure',
  props<{error: null | LoginError}>()
);
export const logoutUser = createAction('[Users] Logout');
export const logoutUserRequest = createAction('[Users] Server Logout Request');
