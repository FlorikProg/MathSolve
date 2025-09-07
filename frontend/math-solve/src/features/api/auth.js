import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8080/api/",
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
        
        throw error; 
    }
}

export async function refreshAccessToken() {
  const res = await api.post("/auth/refresh", {}, { withCredentials: true });

  if (res.status !== 200) throw new Error('Refresh failed');

  const newAccessToken = res.data.access_token;

  return newAccessToken;
}
