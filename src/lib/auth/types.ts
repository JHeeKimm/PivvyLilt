export interface IUser {
  uid: string;
  email: string;
  nickname: string;
  bio?: string;
  profileImage?: string;
}

// profile_image, bio 추가 필요
export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  uid: string;
  bio: string;
  email: string;
  nickname?: string;
  profileImage?: string;
  accessToken: string;
}
