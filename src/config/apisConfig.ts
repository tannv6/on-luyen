import axios, { Method } from "axios";
axios.defaults.baseURL = "https://on-luyen-api.onrender.com";

const api = async (url: any, method: Method, data: any) => {
  try {
    const res = await axios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
      },
      data: method !== "GET" ? data : undefined,
      params: method === "GET" ? data : undefined,
    });
    return res.data;
  } catch {}
};

export const Api = {
  get: (url: any, data: any) => api(url, "GET", data),
  post: (url: any, data: any) => api(url, "POST", data),
  put: (url: any, data: any) => api(url, "PUT", data),
  delete: (url: any, data: any) => api(url, "DELETE", data),
};
