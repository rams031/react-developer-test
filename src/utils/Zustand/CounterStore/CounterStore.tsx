import create, { GetState, SetState } from "zustand";

// Types
import { counterObjectType, counterState } from "./CounterStoreTypes";


// Initial State
const counterObject: counterObjectType = {
    firstCounter: 0,
    secondCounter: 0
}

// Manipulate Counter Data Action 
const manipulateCounterAction = (set: SetState<counterState>, get: GetState<counterState>, action: string, element: "firstCounter" | "secondCounter") => {
    // Counter Existing Value
    const counterValue = get()[element];

    // Set Counter Value Into Variable
    switch (action) {
        case "INCREMENT_COUNTER":
            return set({ [element]: counterValue + 1 })
        case "DECREMENT_COUNTER":
            return get()[element] > 0 && set({ [element]: counterValue - 1 })
        case "RESET_COUNTER":
            return set({ [element]: 0 })
    }
}

const createCounterStore = create<counterState>((set, get) => ({
    // Counter Object
    ...counterObject,
    // Counter Manipulation
    manipulateCounterAction: (action, element) => manipulateCounterAction(set, get, action, element)
}));

export const counterStore = createCounterStore;