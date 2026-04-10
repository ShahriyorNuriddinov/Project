import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, createProduct, getProductById } from "../services/product.price";
import axios from "axios";
import { toast } from "react-toastify";


export const useProducts = (params?: {
  category?: string;
  subcategory?: string;
  maxPrice?: number
}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: any) => {
      const res = await axios({
        url: "/api/register",
        method: "POST",
        data: data,
      });
      return res.data;
    },
    onSuccess(data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Success");
    },
    onError() {
      toast.error("Error");
    },
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: object) => {
      const res = await axios({
        url: "/api/login",
        method: "POST",
        data: data,
      });
      return res.data;
    },
    onSuccess(data: any) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Success");
    },
    onError() {
      toast.error("Error");
    },
  });
};