import { SetState } from "zustand"

// Types
interface profileLocationDetailsType {
    street: string,
    city: string,
    state: string,
    country: string,
    timezone: string
}

interface profileDetailsType {
    id?: string,
    title?: string,
    firstName: string | undefined,
    lastName: string | undefined,
    picture?: string,
    gender?: string,
    email: string | undefined,
    dateOfBirth?: string,
    phone?: string,
    location?: profileLocationDetailsType,
    registerDate?: string,
    updatedDate?: string
}

interface paramsType {
    firstName: string | undefined,
    lastName: string | undefined,
    email: string | undefined,
}

interface httpTypes extends serviceTypes { set: SetState<profileState> }

interface profileState {
    profileData: profileDetailsType | null
    profileService: ({ action, id, params, afterAction }: serviceTypes) => Promise<void>
}

export type {
    profileLocationDetailsType,
    profileDetailsType,
    httpTypes,
    profileState,
    paramsType
}