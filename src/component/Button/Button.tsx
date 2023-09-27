import React, { FC } from 'react'

// Reusable Button Component
const Button: FC<buttonProps> = (buttonProps) => {
    const { buttonStyle, form, buttonTitle, buttonAction, type } = buttonProps ?? {}
    return <button form={form} className={buttonStyle} onClick={buttonAction} type={type}>{buttonTitle ?? "--"}</button>
}

export default Button