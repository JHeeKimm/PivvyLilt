export interface FetchProfileResponse {
  nickname: string;
  bio?: string;
  profileImage?: File | string | null;
}

export interface EditProfileResponse {
  data: {
    bio: string;
    profileImage: string;
  };
}
