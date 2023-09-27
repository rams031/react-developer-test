// Types
interface counterObjectType {
    firstCounter: number,
    secondCounter: number
}

interface counterState extends counterObjectType {
    manipulateCounterAction: (action: string, element: "firstCounter" |  "secondCounter") => void
}

interface propsType {
    element: "firstCounter" |  "secondCounter";
}

export type { counterState, propsType, counterObjectType }