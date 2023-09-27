import { FC } from 'react';
import { Field, ErrorMessage } from 'formik';

// Types
import { inputProps, optionProps } from './InputFieldTypes';

const InputField: FC<inputProps> = ({ name, type, label, option, disabled }) => {
    return (
        <div className='flex flex-col'>
            <div className='userDetailsLabel flex flex-row gap-2'>
                {label ?? null}
                <ErrorMessage className='text-red-200 text-xs' name={name ?? null}>
                    {(msg: string) => <div className='validateInput'>{msg ?? null}</div>}
                </ErrorMessage>
            </div>
            <Field as={option ? "select" : null} type={type ?? null} className="userDetailsInput" name={name ?? null} disabled={disabled}>
                {option ? option?.map(({ value, label }: optionProps, index: number) => <option key={index} value={value}>{label ?? "--"}</option>) : null}
            </Field>
        </div>
    );
};

export default InputField