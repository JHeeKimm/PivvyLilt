export interface FetchProfileResponse {
  nickname: string;
  bio?: string;
  profileImage?: File | string | null;
}

export interface EditProfileResponse {
  bio: string;
  profileImage: string;
}
