import { useQuery } from "@tanstack/react-query";
import { queryOptions } from "../key";

export const useFetchProfile = (nickname: string) => {
  const { queryKey: fetchProfileKey, queryFn: fetchProfileFn } =
    queryOptions.userProfile(nickname);
  return useQuery({
    queryKey: fetchProfileKey,
    queryFn: fetchProfileFn,
    enabled: !!nickname,
  });
};
