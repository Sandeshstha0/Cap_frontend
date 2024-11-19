// src/services/userService.ts

import axiosInstance from "@/utils/axiosInstance";

export const getUsers = async () => {
  const response = await axiosInstance.get("/admin/users");
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await axiosInstance.get(`/admin/users/${id}`);
  return response.data; // Directly access response.data
};

export const getPostbyUserID = async (id: string) => {
  const response = await axiosInstance.get(`/admin/user/post/${id}`);
  return response.data; // Directly access response.data
};

export const deleteUserPost = async (id: string) => {
  const response = await axiosInstance.delete(`/public/${id}`);
  return response.data; // Directly access response.data
};


getUserById

export const blockUser = async (userId: string) => {
  await axiosInstance.put(`http://localhost:8080/api/v1/admin/block-user/${userId}`);
};

export const unblockUser = async (userId: string) => {
  await axiosInstance.put(`/admin/unblock-user/${userId}`);
};

export const deleteUser = async (userId: string) => {
    await axiosInstance.delete(`/admin/user/${userId}`);
  };

// Add other CRUD functions as needed
