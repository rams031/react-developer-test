import React, { FC } from 'react'
import shallow from 'zustand/shallow'

// Component
import Button from '../Button/Button';

// Zustand Component
import { counterStore } from '../../utils/Zustand/CounterStore/CounterStore'

// Types
import { counterState, propsType } from './CounterTypes';

const Counter: FC<propsType> = (props) => {
    // Element Props
    const { element } = props

    // Global State 
    const counterStoreObject: counterState = counterStore((state) => state, shallow)

    // Manipulate Counter Action Form
    const incrementDecrementOperationForm = () => {
        // Counter Increment Props 
        const incrementButtonPropsContainer: buttonProps = {
            buttonStyle: "primary",
            buttonTitle: "Increment",
            buttonAction: () => counterStoreObject.manipulateCounterAction("INCREMENT_COUNTER", element)
        }

        // Counter Decrement Props 
        const decrementButtonPropsContainer: buttonProps = {
            buttonStyle: "primary",
            buttonTitle: "Decrement",
            buttonAction: () => counterStoreObject.manipulateCounterAction("DECREMENT_COUNTER", element)
        }

        // Counter Reset Props 
        const resetButtonPropsContainer: buttonProps = {
            buttonStyle: "danger",
            buttonTitle: "Reset",
            buttonAction: () => counterStoreObject.manipulateCounterAction("RESET_COUNTER", element)
        }

        // Counter Value Display
        const displayNumberView = () => {
            return <input
                className="text-center border p-2"
                type="number"
                value={counterStoreObject[element] ?? 0}
                disabled
            ></input>;
        }

        return (
            <div className='flex flex-col gap-10'>
                <div className='flex flex-row justify-center items-center gap-4'>
                    <Button {...incrementButtonPropsContainer} />
                    {displayNumberView()}
                    <Button {...decrementButtonPropsContainer} />
                </div>
                <div className='flex justify-center'>
                    <Button {...resetButtonPropsContainer} />
                </div>
            </div>
        )
    }

    return (
        <div className="counter-main">
            {incrementDecrementOperationForm()}
        </div>
    )
}

export default Counter