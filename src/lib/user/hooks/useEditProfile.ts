import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/toast/useToastStore";
import { queryKeys } from "../key";
import { updateUserProfile } from "../api";
import { EditProfileResponse } from "../types";

export const useEditProfile = (nickname: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation<EditProfileResponse, Error, FormData>({
    mutationFn: (formData) => updateUserProfile(nickname, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.userProfile(nickname),
      });

      addToast("프로필 수정 성공!", "success");
    },
    onError: (error: Error) => {
      addToast("프로필 수정에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
