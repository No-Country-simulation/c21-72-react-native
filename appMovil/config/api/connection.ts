import {STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ANDROID} from '@env';
import axios from 'axios';
import { StorageAdapter } from '../adapters/storage-adapter';
import { useRouter } from 'expo-router';
import {Platform} from 'react-native';


export const API_URL = 
    (STAGE === 'prod')
    ? PROD_URL
    : Platform.OS === 'ios'
        ? API_URL_IOS
        : API_URL_ANDROID;

const connectionApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})


connectionApi.interceptors.request.use(
    async (config) => {
        const token = await StorageAdapter.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
);

let isRefreshing = false; // Variable para controlar el estado del refresh

connectionApi.interceptors.response.use(
    response => response, 
    async (error) => {
        const originalRequest = error.config;

        // Verificar si el error es 401 y que no se haya reintentado ya
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {

                return new Promise((resolve, reject) => {
                    const retryRequest = () => {
                        originalRequest._retry = true;
                        resolve(connectionApi(originalRequest).catch(reject));
                    };
                });
            }

            originalRequest._retry = true; // Marcar que ya se intentó
            isRefreshing = true; 

            const refreshToken = await StorageAdapter.getItem('refresh_token');
            
            if (refreshToken) {
                try {
                    const response = await connectionApi.post('/auth/refresh', { token: refreshToken });

                    const { access_token } = response.data;
                    await StorageAdapter.setItem('access_token', access_token); // Almacenar el nuevo token

                    // Actualizar el header de autorización
                    originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
                    isRefreshing = false; // Resetear el estado de refreshing
                    return connectionApi(originalRequest); // Reintentar la solicitud original
                } catch (refreshError) {

                    // Limpiar el almacenamiento en caso de error
                    await StorageAdapter.removeItem('access_token');
                    await StorageAdapter.removeItem('refresh_token');

                    const router = useRouter();
                    router.replace('/auth/LoginScreen');

                    isRefreshing = false; 
                    return Promise.reject(refreshError); 
                }
            }
        }
        return Promise.reject(error);
    }
);


export {
    connectionApi,
}