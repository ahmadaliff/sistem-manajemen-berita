import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/api`,
});

export const postNews = (payload) => api.post("/news", payload);
export const getNews = (params) => api.get("/news", { params });
export const searchNews = (query) => api.get("/search", { params: { query } });
