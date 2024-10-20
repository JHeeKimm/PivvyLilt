export interface IUser {
  uid: string;
  email: string;
  nickName: string;
  profileImage?: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  nickName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  uid: string;
  email: string;
  nickName?: string;
  accessToken: string;
}

export type TSignUpFormError = {
  nickName?: string[];
  email?: string[];
  password?: string[];
};
