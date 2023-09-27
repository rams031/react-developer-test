// Types
interface optionProps {
    value: string,
    label: string
}

interface inputProps {
    name: string,
    type: "text" | "number" | "tel" | "textarea" | "date" | "select" | "email",
    label: string;
    option?: optionProps[]
    disabled?: boolean
}

export type { optionProps, inputProps }