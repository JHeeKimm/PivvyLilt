// import { QueryFunctionContext } from "@tanstack/react-query";
import { customServerRequest } from "../../utils/api/server";
import { customClientRequest } from "../../utils/api/client";
import { EditProfileResponse, FetchProfileResponse } from "./types";

export const fetchUserProfile = async (nickname: string) => {
  const response = await customServerRequest<FetchProfileResponse>({
    endpoint: `/api/user/${nickname}/profile`,
  });

  return response;
};

// export const uploadProfile = async (formData: FormData) => {
//   const response = await customClientRequest({
//     endpoint: "/api/user/${nickname}/profile",
//     method: "POST",
//     body: formData,
//   });

//   return response;
// };

export const updateUserProfile = async (
  nickname: string,
  formData: FormData
) => {
  const response = await customClientRequest<EditProfileResponse>({
    endpoint: `/api/user/${nickname}/profile`,
    method: "PUT",
    body: formData,
  });

  return response;
};
