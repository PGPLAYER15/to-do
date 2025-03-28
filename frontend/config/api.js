import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error("API Error:", error.response);
        return Promise.reject(error);
    }
);