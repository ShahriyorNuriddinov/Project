import axiosapi from "@/lib/axios";

interface ProductType {
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
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
