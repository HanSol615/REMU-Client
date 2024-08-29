// src/services/api.ts

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken, removeToken } from '../store/authStore';

const DEFAULT_TIMEOUT = 300000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken() ? `Bearer ${getToken()}` : '',
        },
        withCredentials: true,
        ...config,
    });

    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                removeToken();
                window.location.href = '/auth/login';
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export const httpClient = createClient();

type RequestMethod = "get" | "post" | "put" | "delete";

export const requestHandler = async <T>(method: RequestMethod, url: string, payload?: T) => {
    try {
        let response;

        switch (method) {
            case "post":
                response = await httpClient.post(url, payload);
                break;
            case "get":
                response = await httpClient.get(url);
                break;
            case "put":
                response = await httpClient.put(url, payload);
                break;
            case "delete":
                response = await httpClient.delete(url);
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }

        return response.data; // 서버 응답의 data를 반환
    } catch (error) {
        console.error('Request failed:', error);
        throw error; // 상위로 에러 전파
    }
};