import React, { FC } from 'react'
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

const CreateForm: FC = () => {
    // Global State 
    const { profileService } = profileStore((state) => state, shallow)

    // Create Profile Data Action
    const createProfileDataAction = (values: profileFormType): Promise<void> | void => {
        const updateServiceConfig: serviceTypes = { action: "CREATE_PROFILE_DATA", params: values }
        return profileService(updateServiceConfig);
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

    // User Create Form
    const formBody = () => {
        return (
            <Formik
                enableReinitialize
                initialValues={formValues}
                validationSchema={UserDetailsSchema}
                onSubmit={createProfileDataAction}
            >
                <Form>
                    <div className='grid grid-cols-3 gap-3'>
                        <InputField name={"email"} type={"email"} label={"Email Address :"} />
                        <InputField name={"firstName"} type={"text"} label={"First Name :"} />
                        <InputField name={"lastName"} type={"text"} label={"Last Name :"} />
                    </div>
                    <div className='py-2'>
                        <Button buttonTitle={"Create User"} buttonStyle={"primary"} />
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