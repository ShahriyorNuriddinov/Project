import axiosapi from "@/lib/axios";

export const registerUser = async (userData: any) => {
  const { data } = await axiosapi.post("/api/register", userData);
  return data;
};


