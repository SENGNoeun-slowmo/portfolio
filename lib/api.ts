import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const API_TOKEN = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "apikey": API_TOKEN,             // Supabase expects this header
    "Authorization": `Bearer ${API_TOKEN}`,
  },
});

import { supabase } from "./supabase";

// Add interceptor for auth if needed later
api.interceptors.request.use(async (config) => {
  let token = null;
  if (typeof window !== "undefined") {
    const { data: { session } } = await supabase.auth.getSession();
    token = session?.access_token || localStorage.getItem("auth-token");
  }
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchProducts = async (params?: { category?: string; sort?: string }) => {
  const { data } = await api.get("/projects", { params }); // Using project endpoints based on previous task
  return data;
};

export const fetchProductBySlug = async (slug: string) => {
  const { data } = await api.get(`/projects/${slug}`);
  return data;
};

export const createProduct = async (formData: FormData) => {
  const { data } = await api.post("/projects/admin", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateProduct = async (id: string, formData: FormData) => {
  const { data } = await api.patch(`/projects/admin/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`/projects/admin/${id}`);
  return data;
};

export const fetchSkills = async () => {
  const { data } = await api.get("/skills");
  return data;
};

export const fetchProfile = async () => {
  const { data } = await api.get("/profile");
  return data;
};

// Admin specific endpoints
export const fetchStats = async () => {
  const { data } = await api.get("/stats");
  return data;
};

export const fetchUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

export const updateUserRole = async (id: string, role: "admin" | "user") => {
  const { data } = await api.patch(`/users/${id}/role`, { role });
  return data;
};

// Message endpoints
export const sendMessage = async (messageData: { name: string; email: string; message: string }) => {
  const { data } = await api.post("/messages", messageData);
  return data;
};

export const fetchMessages = async () => {
  const { data } = await api.get("/messages");
  return data;
};

export const updateMessageStatus = async (id: string, status: "unread" | "read" | "archived") => {
  const { data } = await api.patch(`/messages/${id}/status`, { status });
  return data;
};

export const deleteMessage = async (id: string) => {
  const { data } = await api.delete(`/messages/${id}`);
  return data;
};

// Profile endpoints
export const updateAdminProfile = async (formData: FormData) => {
  const { data } = await api.patch("/profile/admin", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
