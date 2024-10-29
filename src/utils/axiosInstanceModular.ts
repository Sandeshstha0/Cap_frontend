import axios, { Method, RawAxiosRequestHeaders } from 'axios';

const excluded_urls = [
  '/auth/signup',
  '/auth/refresh',
  '/auth/admin/login',
  '/auth/college/login',
  '/auth/college/refresh',
];

const isExcludedUrl = (url: any) => {
  return excluded_urls.some((excluded_url) => url.includes(excluded_url));
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
});

axiosInstance.interceptors.request.use((config) => {

  // console.log('Request intercepted:', config);
  // console.log('isexxluded:', isExcludedUrl(config.url?.toString()));

  if (!isExcludedUrl(config.url?.toString())) {

    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;

});

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    // console.log('Response intercepted:', response);
    return response;
  },

  async function (error) {

    console.log('got error');

    // localStorage.removeItem('accessToken');

    const refreshToken = localStorage.getItem('refreshToken');
    // console.log('refreshToken:', refreshToken);

    if (refreshToken) {

      const response = await axios.post('http://localhost:8080/api/v1/auth/refresh', { refreshToken });
      // console.log(response)
      const newAccessToken = response.data.data[0].access_token;
      // console.log(newAccessToken)
      localStorage.setItem('accessToken', newAccessToken);
      document.cookie = `token=${newAccessToken}; path=/`;

    }
    return Promise.reject(error);
  }
);

export const axiosInstanceModular = async (
  method = 'get' as Method,
  url: string,
  headers = {} as RawAxiosRequestHeaders,
  body = null as any | null,
  responseType = 'json' as any,
  timeout = 10000 as number,
) => {
  try {
    // console.log(headers)
    const response = await axiosInstance({
      method,
      url,
      headers,
      data: body,
      responseType,
      timeout,
    });
    return response;
  } catch (error) {
    // Handle error
    // throw error;
    // console.error('Error in new fnc : ', error);
  }

};

export default axiosInstanceModular;

