import { axiosInstanceToken } from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { FormDataCategory } from "@/interfaces/categories";



export const getCategoriesApi = async () => {
    return axiosInstanceToken
        .get(`/transactionCategory/get-all`)
        .then((response) => {
        return response.data.data;
        })
        .catch((error) => {
        console.log("error", error);
        });
    }

export const createCategoryApi = async (data: FormDataCategory) => {
    return axiosInstanceToken
        .post("/transactionCategory/create", data)
        .then((response) => {
        toast.success("Category created successfully");
        return response.data;
        })
        .catch((error) => {
        toast.error("Category creation failed");
        console.log("error", error);
        });
    }

export const updateCategoryApi = async (id: string, data: FormDataCategory) => {
    return axiosInstanceToken
        .patch(`/transactionCategory/update/${id}`, data)
        .then((response) => {
        toast.success("Category updated successfully");
        return response.data;
        })
        .catch((error) => {
        toast.error("Category update failed");
        console.log("error", error);
        });
    }

export const deleteCategoryApi = async (id: string) => {
    return axiosInstanceToken
        .delete(`/transactionCategory/delete/${id}`)
        .then((response) => {
        toast.success("Category deleted successfully");
        return response.data.success;
        })
        .catch((error) => {
        toast.error("Category deletion failed");
        console.log("error", error);
        });
    }

export const CategoryByIdApi = async (id: string) => {
    return axiosInstanceToken
        .get(`/transactionCategory/get/${id}`)
        .then((response) => {
        return response.data.data;
        })
        .catch((error) => {
        console.log("error", error);
        });
    }
