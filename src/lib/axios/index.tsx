import axios from "axios";
import { getFromSecureStore } from "@/lib/secure-store";

const axiosClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://srcvs.trakyateknopark.com.tr",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await getFromSecureStore("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
