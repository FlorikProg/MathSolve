import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
})

export async function loginUserApi(email, password) {
    try {
        const res = await api.post("/auth/login_user", {
            email,
            password,
        }, {
            withCredentials: true 
        });
        return res.data;
    } 
    catch (error) {
        console.error("Error logging in:", error);
        throw error; 
    }
}

export async function CreateUserApi(email, password, username) {
    try {
        const res = await api.post("/auth/create_user", {
            email: email,
            name: username,
            password: password,
        })
        return res.data
    } 
    catch (error) {
        console.error("Error create user:", error);
        throw error; 
    }
}

export async function refreshAccessToken() {
  const res = await fetch('/user/refresh', {
    method: 'POST',
    credentials: 'include'
  });

  if (!res.ok) throw new Error('Refresh failed');

  const data = await res.json();
  const newAccessToken = data.access_token;

  return newAccessToken;
}
