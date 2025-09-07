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
export async function CreateTaskApi({name, description, solution, answer, user, source, photo, school_class, subject, tag, complex}) {
  try {
    const res = await api.post("/task/create_task", {
      name,
      description, 
      solution,
      answer,
      source,
      created_by: user, 
      photo, 
      school_class,
      subject,
      tag,
      complex
    })

    return res.data
  } catch (error) {
    toast("Ошибка, похоже какие-то поля не заполнены");
    
    throw error

  }
}

export async function GetTasks({ class_school, subject }) {
  try {
    const res = await api.post("/task/get_tasks", {
      class: class_school,
      subject: subject
    });

    return res.data;
  } catch (error) {
    toast("Ошибка");
    
    throw error;
  }
}


export async function GetFullInfoAboutTask({ uuid }) {
  try {
    const res = await api.post("/task/get_info_about_task", {
      uuid: uuid
    });

  
    return res.data;
  } catch (error) {
    toast("Ошибка");
    console.error("Error get tasks:", error.response?.data || error);
    throw error;
  }
}

export async function CompleteTask({ uuid, attempts }) {
  try {
    const res = await api.post("/task/complete_task", {
      uuid,
      attempts
    });
    console.log(res)
  
    return res.data;
  } catch (error) {
    toast("Ошибка");

  
    throw error;
  }
}



export async function IsSolvedByUser({ uuid }) {
  try {
    const res = await api.post("/task/is_solved", {
      uuid
    });
    console.log(res)
  
    return res.data;
  } catch (error) {
    alert("Ошибка");

    
    throw error;
  }
}





