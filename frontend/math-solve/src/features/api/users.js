"use client"
import axios from "axios";
import { toast } from "sonner"
import { refreshAccessToken } from "./auth.js";
const api = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 5000,
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access_token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newAccessToken = await refreshAccessToken()
        localStorage.setItem("access_token", newAccessToken)
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        window.location.href = "/login_user"
        return
      }
    }
    return Promise.reject(error)
  }
)
export async function GetUserApi() {
  try {
    const res = await api.post("/user/get_user");
    console.log(res)
  
    return res.data;
  } catch (error) {
    toast("Ошибка при получении данных пользователя");

    throw error;
  }
}

export async function IsUserAdmin() {
  try {
    const res = await api.post("/user/is_admin");
    console.log(res)
  
    return res.data;
  } catch (error) {
    toast("Ошибка");
    
    throw error;
  }
}
