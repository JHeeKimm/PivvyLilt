import { fetchUserProfile } from "./api";

export const USER_KEY = "USER";

export const queryKeys = {
  userProfile: (nickname: string) => [USER_KEY, nickname],
};

export const queryOptions = {
  userProfile: (nickname: string) => ({
    queryKey: queryKeys.userProfile(nickname),
    queryFn: () => fetchUserProfile(nickname),
  }),
};
