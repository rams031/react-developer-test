import axios, { AxiosRequestConfig } from "axios";

const baseUrl: any | string = process.env.REACT_APP_API_PATH
const appId: any | string = process.env.REACT_APP_API_ID;

const axiosConfig: AxiosRequestConfig = {
    baseURL: baseUrl,
    headers: { 'app-id': appId },
}
// Axios Configuration
export const API = axios.create(axiosConfig);