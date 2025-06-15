/** @format */

// @/services/api.ts

import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_URL || "https://your-cloud-run-url.com";

export const loginAdmin = async (data: { email: string; password: string }) => {
  return axios.post(`${API_BASE}/auth/login`, data);
};

export const registerAdmin = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return axios.post(`${API_BASE}/auth/register`, data);
};
