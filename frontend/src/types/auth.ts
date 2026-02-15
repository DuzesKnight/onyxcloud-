export interface User {
  id: number;
  uuid: string;
  email: string;
  fullName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
