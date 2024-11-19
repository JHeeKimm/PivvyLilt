import { useQuery } from "@tanstack/react-query";
import { queryOptions } from "../key";

export const useFetchFollowerCounts = (userId: string) => {
  const { queryKey: fetchFollowerCountsKey, queryFn: fetchFollowerCountsFn } =
    queryOptions.followCounts(userId);
  return useQuery({
    queryKey: fetchFollowerCountsKey,
    queryFn: fetchFollowerCountsFn,
  });
};
