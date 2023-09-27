import { AxiosResponse } from "axios";
import create, { SetState } from "zustand";

// Components
import { Toast, deleteService, getService, postService, putService } from '../../../service/API/HttpService/HttpService';

// Types
import { httpTypes, profileDetailsType, profileState } from "./ProfileStoreTypes";
import moment from "moment";

// Initial State
const userDetailFormObject: profileDetailsType = {
    title: "",
    firstName: "",
    lastName: "",
    picture: "",
    gender: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    location: {
        street: "",
        city: "",
        state: "",
        country: "",
        timezone: ""
    },
    registerDate: "",
    updatedDate: ""
}

// Function HTTP Condition (If called)
const httpServiceAction = (props: httpTypes) => {
    const { set, action, id, params, afterAction } = props || {}

    switch (action) {
        case "FETCH_USER_LIST_DATA":
            return fetchUserDataAction(set)
        case "FETCH_PROFILE_DATA":
            return fetchUserDataWithIDAction(set, id)
        case "CREATE_PROFILE_DATA":
            return createUserProfileDataAction(params, afterAction)
        case "UPDATE_PROFILE_DATA":
            return updateUserProfileDataAction(id, params)
        case "DELETE_PROFILE_DATA":
            return deleteUserProfileDataAction(id, afterAction)
    }
}

// Get Profile Data List Action (Service)
const fetchUserDataAction = async (set: SetState<profileState>): Promise<void> => {
    try {
        const response: void | AxiosResponse<any, any> = await getService("/user/");
        const results: profileDetailsType = response?.data;
        if (response?.status === 200) return set({ profileData: results })
    } catch (error) {
        console.error("Http Request Error: " + error)
    }
}

// Get Profile Data List Action (Service)
const fetchUserDataWithIDAction = async (set: SetState<profileState>, id?: string): Promise<void> => {
    try {
        const response: void | AxiosResponse<any, any> = await getService("/user/" + id);
        const results: profileDetailsType = response?.data;
        const reassignResult = { ...results, dateOfBirth: moment(results?.dateOfBirth).format("YYYY-MM-DD"), }
        console.log("🚀 ~ file: ProfileStore.tsx:67 ~ fetchUserDataWithIDAction ~ reassignResult:", reassignResult)

        if (response?.status === 200) return set({ profileData: reassignResult })
        return set({ profileData: null })
    } catch (error) {
        console.error("Http Request Error: " + error)
        return set({ profileData: null })
    }
}

// Create Profile Data Action (API)
const createUserProfileDataAction = async (params: profileDetailsType | undefined, afterAction?: (() => void) | undefined | void): Promise<void> => {

    const configuredParams: profileDetailsType = {
        firstName: params?.firstName,
        lastName: params?.lastName,
        email: params?.email
    }

    try {
        const response: void | AxiosResponse = await postService("/user/create", configuredParams);
        if (response?.status === 200) {
            Toast.fire({ icon: "success", title: "User Data Created" });
            if (afterAction) return afterAction();
        }
    } catch (error) {
        console.error("Http Request Error: " + error)
    }
}

// Update Profile Data Action (API)
const updateUserProfileDataAction = async (id?: string, params?: profileDetailsType): Promise<void> => {
    try {
        const response: void | AxiosResponse<any, any> = await putService("/user/" + id, params);
        if (response?.status === 200) Toast.fire({ icon: "success", title: "User Data Updated" });
    } catch (error) {
        console.error("Http Request Error: " + error)
    }
}

// Update Profile Data Action
const deleteUserProfileDataAction = async (id?: string, afterAction?: (() => void) | undefined | void): Promise<void> => {
    const revalidateUserList = (): Promise<void> => {
        const getUserListConfig: serviceTypes = { action: "FETCH_USER_LIST_DATA" };
        return profileStore.getState().profileService(getUserListConfig);
    }

    try {
        const response: void | AxiosResponse<any, any> = await deleteService("/user/" + id);
        if (response?.status === 200) {
            revalidateUserList()
            Toast.fire({ icon: "success", title: "User Data Deleted" });
            if (afterAction) return afterAction()
        }
    } catch (error) {
        console.error("Http Request Error: " + error)
    }
}

const createProfileStore = create<profileState>((set: SetState<profileState>) => ({
    // Profile Object
    profileData: userDetailFormObject,
    // Profile Function
    profileService: ({ action, id, params }) => httpServiceAction({ set, action, id, params })
}));

export const profileStore = createProfileStore;