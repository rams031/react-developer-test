import { fireEvent, render, screen } from "@testing-library/react"
import Counter from "../component/Counter/Counter"

let counterValue: HTMLInputElement
let incrementButton: HTMLElement
let decrementButton: HTMLElement
let resetButton: HTMLElement

describe("Counter Operation", () => {
    beforeEach(() => {
        render(<Counter element={"firstCounter"} />)
        counterValue = screen.getByRole("spinbutton");
        incrementButton = screen.getByRole("button", { name: "Increment" });
        decrementButton = screen.getByRole("button", { name: "Decrement" });
        resetButton = screen.getByRole("button", { name: "Reset" });
    });

    it('counter operation element exist', () => {
        expect(counterValue).toBeInTheDocument()
        expect(incrementButton).toBeInTheDocument()
        expect(decrementButton).toBeInTheDocument()
        expect(resetButton).toBeInTheDocument()
    })

    it('increment counter value by increment button trigger', () => {
        expect(counterValue).toHaveValue(0);
        fireEvent.click(incrementButton);
        expect(counterValue).toHaveValue(1);
    })

    it('decrement counter value by decrement button trigger', () => {
        expect(counterValue).toHaveValue(1);
        fireEvent.click(decrementButton)
        expect(counterValue).toHaveValue(0);
    })

    it('reset counter value to 0 by reset button trigger', () => {
        fireEvent.click(incrementButton);
        expect(counterValue).toHaveValue(1);
        fireEvent.click(resetButton);
        expect(counterValue).toHaveValue(0);
    })

    it('counter value should not be negative number', () => {
        fireEvent.click(decrementButton);
        expect(counterValue).not.toHaveValue(-1);
    })

})