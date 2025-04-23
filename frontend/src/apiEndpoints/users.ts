import { axiosInstanceToken } from "@/utils/axiosInstance";

export const GetAllUsersApi = async ({ param }: { param?: URLSearchParams }) => {
  return axiosInstanceToken
    .get(`/user/get-all?${new URLSearchParams(param)}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
