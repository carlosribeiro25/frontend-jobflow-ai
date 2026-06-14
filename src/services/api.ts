import axios from 'axios'
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');

        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if(originalRequest.url === '/refresh') {
            Cookies.remove('token');
            Cookies.remove('refreshToken');
            window.location.href = '/login';
            return Promise.reject(error)
        }

        if(error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

          try {
            const refreshToken = Cookies.get('refreshToken');
            const response = await api.post('/refresh', { token: refreshToken});
            const newAccessToken = response.data.accessToken;

            Cookies.set('token', newAccessToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            return api(originalRequest)
            
          } catch (refreshError) {
            Cookies.remove('token');
            Cookies.remove('refreshToken')
            window.location.href = '/login';
            return Promise.reject(refreshError)
          }  
        }

        return Promise.reject(error)
    }
)