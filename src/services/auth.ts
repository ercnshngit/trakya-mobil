import axiosClient from "@/lib/axios";

export const login = async (data) => {
  return axiosClient.post("/auth/login", data);
};

export const register = async (data) => {
  return axiosClient.post("/auth/register", data);
};
