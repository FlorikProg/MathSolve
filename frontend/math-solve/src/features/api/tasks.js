"use client"
import axios from "axios";
import { toast } from "sonner"

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token")  // убедись, что токен реально там есть
  console.log("Token from localStorage:", token)     // проверка
  if (token) {
    config.headers.Authorization = `Bearer ${token}` // правильно пишем Authorization
  }
  console.log("Final headers:", config.headers)
  return config
})

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
    alert("Ошибка")
    console.error("Error create task:", error.response?.data || error)
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
    alert("Ошибка");

    // ждём выполнения
    const newAccessToken = await refreshAccessToken();
    console.log('Новый токен:', newAccessToken);

    console.error("Error get tasks:", error.response?.data || error);
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
    alert("Ошибка");
    console.error("Error get tasks:", error.response?.data || error);
    throw error;
  }
}

export async function CompleteTask({ uuid }) {
  try {
    const res = await api.post("/task/complete_task", {
      uuid
    });
    console.log(res)
  
    return res.data;
  } catch (error) {
    alert("Ошибка");

    console.error("Error get tasks:", error.response?.data || error);
    throw error;
  }
}





