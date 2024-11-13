import axios from 'axios';

export const axiosClient = axios.create({
  baseURL:'http://localhost:8080/api/v1',
});

export function setAxiosAuthHeader(token: string) {
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Function to clear the Authorization header
export function clearAxiosAuthHeader() {
  delete axiosClient.defaults.headers.common['Authorization'];
}