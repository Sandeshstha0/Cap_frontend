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

// Add other CRUD Reminder  functions as needed

interface Reminder {
  id?: number;
  date: string;
  time: string;
  description: string;
}


export const getNotice = async () => {
  const response = await axiosInstance.get("/user/reminders");
  return response.data;
};

export const addReminder = async (reminder: Reminder) => {
  try {
    const response = await axiosInstance.post("/user/reminders", reminder);
    if (response.status === 200) {
      console.log("Reminder added successfully:", response.data);
      return response.data; // Return the response data
    } else {
      console.error("Failed to add reminder:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding reminder:", error);
  }
};

// Function to update an existing reminder
export const updateReminder = async (reminder: Reminder) => {
  try {
    const response = await axiosInstance.put(`/user/reminders/${reminder.id}`, reminder);
    if (response.status === 200) {
      console.log("Reminder updated successfully:", response.data);
      return response.data; // Return the updated reminder data
    } else {
      console.error("Failed to update reminder:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating reminder:", error);
  }
};


export const deleteReminder = async (id: number) => {
  try {
    await axiosInstance.delete(`/user/reminders/${id}`); // Update the endpoint as needed
  } catch (error) {
    console.error("Error deleting reminder:", error);
    throw error;
  }
};