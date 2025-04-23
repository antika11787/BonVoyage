import { axiosInstanceToken } from "@/utils/axiosInstance";
import {
  FormDataTour,
  PromoteMemberProps,
  RemoveMemberProps,
} from "@/interfaces/tour";
import { toast } from "react-toastify";

export const TourListApi = async ({ param }: { param?: URLSearchParams }) => {
  return axiosInstanceToken
    .get(`/tour-member/get-my-tours?${new URLSearchParams(param)}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const GetTourMembersApi = async (tourId: string) => {
  return axiosInstanceToken
    .get(`/tour-member/get-member/${tourId}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const TourByIdApi = async (id: string) => {
  return axiosInstanceToken
    .get(`/tour/get-tour/${id}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const CreateTourApi = async (data: FormDataTour) => {
  return axiosInstanceToken
    .post("/tour/create", data)
    .then((response) => {
      toast.success("Tour created successfully");
      return response.data.data;
    })
    .catch((error) => {
      toast.error("Tour creation failed");
      console.log("error", error);
    });
};

export const UpdateTourApi = async (id: string, data: FormDataTour) => {
  return axiosInstanceToken
    .put(`/tour/update/${id}`, data)
    .then((response) => {
      toast.success("Tour updated successfully");
      return response.data.data;
    })
    .catch((error) => {
      toast.error("Tour updation failed");
      console.log("error", error);
    });
};

export const DeleteTourApi = async (id: string) => {
  return axiosInstanceToken
    .delete(`/tour/delete/${id}`)
    .then((response) => {
      toast.success("Tour deleted successfully");
      return response.data.success;
    })
    .catch((error) => {
      toast.error("Tour deletion failed");
      console.log("error", error);
    });
};

export const LeaveTourApi = async (id: string) => {
  return axiosInstanceToken
    .delete(`/tour-member/leave-tour/${id}`)
    .then((response) => {
      toast.success("Tour left successfully");
      return response.data.success;
    })
    .catch((error) => {
      toast.error("Tour leave failed");
      console.log("error", error);
    });
};

export const PromoteMemberApi = async (data: PromoteMemberProps) => {
  return axiosInstanceToken
    .put(`/tour-member/promote-member`, data)
    .then((response) => {
      toast.success("Member promoted successfully");
      return response.data.data;
    })
    .catch((error) => {
      toast.error("Member promotion failed");
      console.log("error", error);
    });
};

export const RemoveMemberApi = async (data: RemoveMemberProps) => {
  return axiosInstanceToken
    .delete(`/tour-member/remove-member/${data.tourId}/${data.userId}`)
    .then((response) => {
      toast.success("Member removed successfully");
      return response.data.data;
    })
    .catch((error) => {
      toast.error("Member removal failed");
      console.log("error", error);
    });
};

export const AddMemberToTourApi = async (data: PromoteMemberProps) => {
  return axiosInstanceToken
    .post(`/tour-member/add-member`, data)
    .then((response) => {
      toast.success("Member added successfully");
      return response.data.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.log("error", error);
    });
};
