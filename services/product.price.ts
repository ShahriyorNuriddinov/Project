import axiosapi from "@/lib/axios";
import axios from "axios";

interface ProductType {
  name: string;
  price: number;
  category: string;
  image?: string;
  description?: string;
  stock: number;
  oldPrice?: number;
}
export const getProducts = async (params?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const { data } = await axiosapi.get("/api/products", { params });
  return data;
};

export const createProduct = async (product: ProductType) => {
  const { data } = await axiosapi.post("/api/products", product);
  return data;
};
export const getProductById = async (id: string) => {
  const { data } = await axiosapi.get(`/api/products/${id}`);
  return data;
};
export const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<ProductType>;
}) => {
  const { data: res } = await axiosapi.put(`/api/products/${id}`, data);
  return res;
};

export const deleteProduct = async (id: string) => {
  const { data } = await axiosapi.delete(`/api/products/${id}`);
  return data;
};
export const getSellers = async () => {
  const { data } = await axiosapi.get("/api/admin/sellers");
  return data;
};

export const createSeller = async (seller: {
  name: string;
  email: string;
  password: string;
}) => {
  const { data } = await axiosapi.post("/api/admin/sellers", seller);
  return data;
};
export const deleteSeller = async (id: string) => {
  const { data } = await axiosapi.delete(`/api/admin/sellers/${id}`);
  return data;
};
export const deleteadmin = async (id: string) => {
  const { data } = await axiosapi.post(`/api/delete/admin${id}`);
  return data;
};

export const admin = async (id: string) => {
  const { data } = await axiosapi.delete(`/api/delete/admin${id}`);
  return data;
};
