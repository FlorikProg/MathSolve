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

export async function CreateTaskApi({name, description, solution, answer, user, source, photo}) {
  try {
    const res = await api.post("/task/create_task", {
      name,
      description, 
      solution,
      answer,
      source,
      created_by: user, // ← исправлено: используем параметр user как created_by
      photo
      // uuid убрано - генерируется автоматически
    })

    return res.data
  } catch (error) {
    alert("Ошибка")
    console.error("Error create task:", error.response?.data || error)
    throw error

  }
}