import axios, { AxiosRequestConfig } from "axios";

// API Path
export const baseUrl: string = "https://dummyapi.io/data/v1/";

// API Header (Required)
export const appId: string = "65080fec01538513690ca63e";

const axiosConfig: AxiosRequestConfig = {
    baseURL: baseUrl,
    headers: { 'app-id': appId },
}
// Axios Configuration
export const API = axios.create(axiosConfig);