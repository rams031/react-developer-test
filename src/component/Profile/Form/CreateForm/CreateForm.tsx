import React, { Dispatch, FC, SetStateAction } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import shallow from 'zustand/shallow';

// Components
import InputField from '../../../Form/InputField/InputField';
import Button from '../../../Button/Button';

// Zustand Component
import { profileStore } from '../../../../utils/Zustand/ProfileStore/ProfileStore';

// Types
import { profileFormType } from './CreateFormTypes';


const CreateForm: FC<{ setCreateView: Dispatch<SetStateAction<boolean>> }> = (props) => {
    const { setCreateView } = props || {}

    // Global State 
    const { profileService } = profileStore((state) => state, shallow)

    // Create Profile Data Action
    const createProfileDataAction = (values: profileFormType, actions: any): Promise<void> | void => {
        const dispatchCreateAction: serviceTypes = { action: "CREATE_PROFILE_DATA", params: values, afterAction: actions.resetForm() }
        return profileService(dispatchCreateAction);
    }

    // Form Values Object 
    const formValues: profileFormType = {
        email: "",
        firstName: "",
        lastName: "",
    }

    // Form Values Validation Configuration
    const UserDetailsSchema = Yup.object().shape({
        email: Yup.string().email().required('Field Required'),
        firstName: Yup.string().required('Field Required'),
        lastName: Yup.string().required('Field Required'),
    })

    // Form Header Display
    const formHeader = () => {
        return (
            <div className='text-xl font-semibold'>
                Create User
            </div>
        )
    }

    // User Create Form Body
    const formBody = () => {
        return (
            <Formik
                enableReinitialize
                initialValues={formValues}
                validationSchema={UserDetailsSchema}
                onSubmit={createProfileDataAction}
            >
                <Form>
                    <div className='flex flex-col gap-2'>
                        <InputField name={"email"} type={"email"} label={"Email Address :"} />
                        <InputField name={"firstName"} type={"text"} label={"First Name :"} />
                        <InputField name={"lastName"} type={"text"} label={"Last Name :"} />
                    </div>
                    <div className='flex flex-row gap-4 py-2'>
                        <Button buttonTitle={"Create User"} buttonStyle={"primary"} />
                        <Button buttonTitle={"Back"} buttonStyle={"dark"} buttonAction={() => setCreateView(false)} />
                    </div>
                </Form>
            </Formik>
        )
    }

    return (
        <div className='flex flex-col gap-4 justify-center items-center'>
            {formHeader()}
            {formBody()}
        </div>
    )
}

export default CreateForm