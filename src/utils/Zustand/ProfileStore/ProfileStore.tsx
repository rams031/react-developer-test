import { AxiosResponse } from "axios";
import create, { SetState } from "zustand";

// Components
import { Toast, deleteService, getService, postService, putService } from '../../../service/API/HttpService/HttpService';

// Types
import { httpTypes, profileDetailsType, profileState } from "./ProfileStoreTypes";

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

const httpServiceAction = (props: httpTypes) => {
    const { set, action, id, params } = props

    switch (action) {
        case "FETCH_USER_LIST_DATA":
            return fetchUserDataAction(set)
        case "FETCH_PROFILE_DATA":
            return fetchUserDataWithIDAction(set, id)
        case "CREATE_PROFILE_DATA":
            return createUserProfileDataAction(params)
        case "UPDATE_PROFILE_DATA":
            return updateUserProfileDataAction(id, params)
        case "DELETE_PROFILE_DATA":
            return deleteUserProfileDataAction(id)
    }
}

// Get User Data List Action (Service)
const fetchUserDataAction = async (set: SetState<profileState>): Promise<void> => {
    try {
        const response: void | AxiosResponse<any, any> = await getService("/user/");
        const results: profileDetailsType = response?.data;
        if (response?.status === 200) return set({ profileData: results })
    } catch (error) {
        console.error("Http Request Error: " + error)
    }
}

// Get User Data List Action (Service)
const fetchUserDataWithIDAction = async (set: SetState<profileState>, id?: string): Promise<void> => {
    try {
        const response: void | AxiosResponse<any, any> = await getService("/user/" + id);
        const results: profileDetailsType = response?.data;
        if (response?.status === 200) return set({ profileData: results })
        return set({ profileData: null })
    } catch (error) {
        console.error("Http Request Error: " + error)
        return set({ profileData: null })
    }
}

// Create Profile Data Action (API)
const createUserProfileDataAction = async (params: profileDetailsType | undefined): Promise<void> => {

    const configuredParams = {
        firstName: params?.firstName,
        lastName: params?.lastName,
        email: params?.email
    }

    try {
        const response: void | AxiosResponse<any, any> = await postService("/user/create", configuredParams);
        if (response?.status === 200) {
            Toast.fire({ icon: "success", title: "User Data Created" });
            // return navigate("/")
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
const deleteUserProfileDataAction = async (id?: string): Promise<void> => {
    const revalidateUserList = (): Promise<void> => {
        const getUserListConfig: serviceTypes = { action: "FETCH_USER_LIST_DATA" };
        return profileStore.getState().profileService(getUserListConfig);
    }

    try {
        const response: void | AxiosResponse<any, any> = await deleteService("/user/" + id);
        if (response?.status === 200) {
            revalidateUserList()
            Toast.fire({ icon: "success", title: "User Data Deleted" });
        }
    } catch (error) {
        console.error("Http Request Error: " + error)
    }
}

const createProfileStore = create<profileState>((set: SetState<profileState>) => ({
    // Profile Object
    profileData: userDetailFormObject,
    // Profile HTTP Service
    profileService: ({ action, id, params }) => httpServiceAction({ set, action, id, params })
}));

export const profileStore = createProfileStore;