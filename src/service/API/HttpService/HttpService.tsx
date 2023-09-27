import Swal from "sweetalert2";
import { AxiosResponse, AxiosError } from 'axios';

// Components
import { API } from "../Server/Server"

// Types
interface errorResultType {
    data: any | unknown
    error: string
}

// Alert Module Config
export const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
});

// Get HTTP Request Action
export const getService = async (pathName: string): Promise<void | AxiosResponse<any, any>> => {
    return API.get(pathName)
        .then((response: AxiosResponse) => response)
        .catch((error: AxiosError<errorResultType> | undefined) => apiErrorAlert(error));
}

export const postService = async (pathName: string, paramValue: any): Promise<void | AxiosResponse<any, any>> => {
    return API.post(pathName, paramValue)
        .then((response: AxiosResponse) => response)
        .catch((error: AxiosError<errorResultType> | undefined) => apiErrorAlert(error));
}

export const putService = async (pathName: string, paramValue: any): Promise<void | AxiosResponse<any, any>> => {
    return API.put(pathName, paramValue)
        .then((response: AxiosResponse) => response)
        .catch((error: AxiosError<errorResultType> | undefined) => apiErrorAlert(error));
}

export const deleteService = async (pathName: string): Promise<void | AxiosResponse<any, any>> => {
    return API.delete(pathName)
        .then((response: AxiosResponse) => response)
        .catch((error: AxiosError<errorResultType> | undefined) => apiErrorAlert(error));
}

// Error Catcher Alerts
const apiErrorAlert = (error: AxiosError<errorResultType> | undefined) => {
    const errorResult = error?.response?.data;
    
    switch (error?.response?.status) {
        case 204:
            Toast.fire({ icon: "error", title: "Server not responding" });
            break;
        case 400:
            Toast.fire({ icon: "error", title: JSON.stringify(errorResult).replace('{', "").replace('}', "") });
            break;
        case 401:
            Toast.fire({ icon: "warning", title: error?.message });
            break;
        case 404:
            Toast.fire({ icon: "warning", title: JSON.stringify(errorResult?.error) });
            break;
        case 405:
            Toast.fire({ icon: "warning", title: error?.message });
            break;
        case 422:
            Toast.fire({ icon: "warning", title: error?.message });
            break;
        case 502:
            Toast.fire({ icon: "error", title: "Server Error" });
            break;
        case 12023:
            Toast.fire({ icon: "error", title: error?.message });
            break;
        default:
            Toast.fire({
                icon: "error",
                title: `Returned error request ${error?.response?.status}!. Please try again later`,
            });
            break;

    }
}