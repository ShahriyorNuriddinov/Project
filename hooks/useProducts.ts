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
    mutationKey: ["add-products"],
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
      toast.success("success")
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    },
    onError() {
      toast.error("error");
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
      toast.success("success")
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    },
    onError() {
      toast.error("error")
    },
  });
};

import { updateProduct, deleteProduct } from "../services/product.price";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};


export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

import { getSellers, createSeller, deleteSeller } from "../services/product.price";

export const useSellers = () => {
  return useQuery({ queryKey: ["sellers"], queryFn: getSellers });
};

export const useCreateSeller = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSeller,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sellers"] }),
  });
};

export const useDeleteSeller = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSeller,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sellers"] }),
  });
};
