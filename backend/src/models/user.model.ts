export interface UserModel {
  id: number;
  uuid: string;
  email: string;
  full_name: string;
  password_hash: string;
  wallet_balance: number;
  is_active: 0 | 1;
  created_at: string;
  updated_at: string;
}

export interface CreateUserInput {
  uuid: string;
  email: string;
  fullName: string;
  passwordHash: string;
}

export interface AuthUser {
  id: number;
  uuid: string;
  email: string;
  fullName: string;
}

export const toAuthUser = (user: UserModel): AuthUser => ({
  id: user.id,
  uuid: user.uuid,
  email: user.email,
  fullName: user.full_name
});
