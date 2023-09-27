interface serviceTypes {
    action:  "FETCH_PROFILE_DATA" | "CREATE_PROFILE_DATA" | "UPDATE_PROFILE_DATA" | "DELETE_PROFILE_DATA" | "FETCH_USER_LIST_DATA",
    id?: string,
    params?: profileDetailsType
    afterAction?: (() => void) | undefined | void
}

interface buttonProps {
    buttonStyle: "primary" | "dark" | "warning" | "success" | "light" | "danger";
    buttonTitle: string,
    form?: string,
    buttonAction?: () => void | Promise<void>,
    type?: "button" | "submit" | "reset" | undefined
}

