import { AxiosResponse } from "axios";
import create, { SetState } from "zustand";
import { getService } from "../../../service/API/HttpService/HttpService";

// Types
import { responseType, userState } from "./UserStoreTypes";

// Get User Data List Action (Service)
const getUserDataAction = async (set: SetState<userState>): Promise<void | boolean> => {
    try {
        const response: void | AxiosResponse<responseType> = await getService('/user?limit=9');
        const result = response?.data?.data;
        const status = response?.status;
        return status === 200 && set({ userData: result ?? [] })
    } catch (error) {
        console.error("Http Request Error: " + error)
    }
}

const createUserStore = create<userState>((set: SetState<userState>) => ({
    // User Object
    userData: null,
    // User Function
    getUserDataAction: () => getUserDataAction(set)
}));

export const userStore = createUserStore;