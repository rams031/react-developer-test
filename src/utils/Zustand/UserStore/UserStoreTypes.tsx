// Types
interface userDataType {
    id: string,
    title: string,
    firstName: string,
    lastName: string,
    picture: string
}

interface responseType {
    data: userDataType[],
    limit: number,
    page: number,
    total: number
}

interface userState {
    userData: userDataType[] | null,
    getUserDataAction: () => Promise<void | boolean>
}

export type {
    userDataType,
    responseType,
    userState
}