export interface User {
  _id: string,
  email: string,
  displayName: string,
  token: string,
}

export interface RegisterUserData {
  [key: string]: any;
  email: string,
  password: string,
  displayName: string,
}

export interface FieldError {
  message: string
}

export interface RegisterError {
  errors: {
    password: FieldError,
    email: FieldError
  }
}

export interface LoginError {
  error: string
}

export interface LoginUserData {
  email: string,
  password: string,
}
