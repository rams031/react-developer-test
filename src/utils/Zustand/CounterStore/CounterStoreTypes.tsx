// Types
interface counterObjectType {
    firstCounter: number,
    secondCounter: number
}

interface counterState extends counterObjectType {
    manipulateCounterAction: (action: string, element: "firstCounter" | "secondCounter") => void
}

export type { counterObjectType, counterState }