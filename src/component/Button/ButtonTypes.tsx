interface buttonType {
    buttonStyle: "primary" | "dark" | "warning" | "success" | "light" | "danger";
    buttonTitle: string,
    form?: string,
    buttonAction?: () => void | Promise<void>,
    type?: "button" | "submit" | "reset" | undefined
}

export type { buttonType }