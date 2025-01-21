import axiosInstance from '@/utils/axiosInstance';
import axios from 'axios';

const API_URL = '/contents';

export const getAllContents = () => axiosInstance.get(API_URL);

export const getContentById = (id: number) => axiosInstance.get(`${API_URL}/${id}`);

export const createOrUpdateContent = (data: FormData) =>
    axiosInstance.post(API_URL, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteContent = (id: number) => axiosInstance.delete(`${API_URL}/${id}`);
