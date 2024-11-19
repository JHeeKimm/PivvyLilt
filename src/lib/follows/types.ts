export interface FetchFollowerCountsResponse {
  data: {
    followersCount: number;
    followingsCount: number;
  };
}

export interface FetchIsFollowingResponse {
  isFollowing: boolean;
}
