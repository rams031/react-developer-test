// Types
interface profileDetailsType {
    id?: string,
    title?: string,
    firstName: string,
    lastName: string,
    picture?: string,
    gender?: string,
    email: string,
    dateOfBirth?: string,
    phone?: string,
    location?: profileLocationDetailsType,
    registerDate?: string,
    updatedDate?: string
}

interface profileLocationDetailsType {
    street: string,
    city: string,
    state: string,
    country: string,
    timezone: string
}

interface formPropsType {
    id?: string,
    formData: profileDetailsType
}

interface genderSelectionType {
    value: string,
    label: string
}

export type {
    profileDetailsType,
    profileLocationDetailsType,
    formPropsType,
    genderSelectionType
}

