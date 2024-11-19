import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/toast/useToastStore";
import { queryKeys } from "../key";
import { updateUserProfile } from "../api";
import { EditProfileResponse } from "../types";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const useEditProfile = (nickname: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<EditProfileResponse, Error, FormData>({
    mutationFn: (formData) => updateUserProfile(nickname, formData),
    onSuccess: (response) => {
      const data = response?.data;

      queryClient.invalidateQueries({
        queryKey: queryKeys.userProfile(nickname),
      });

      setUser({
        bio: data.bio || user?.bio,
        profileImage: data.profileImage || user?.profileImage,
        uid: user?.uid || "",
        email: user?.email || "",
        nickname: user?.nickname || "",
      });

      addToast("프로필 수정 성공!", "success");
    },
    onError: (error: Error) => {
      addToast("프로필 수정에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
