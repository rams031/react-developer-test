import React, { FC, Fragment } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import shallow from 'zustand/shallow';

// Components
import InputField from '../../../Form/InputField/InputField'
import Button from '../../../Button/Button'

// Zustand Component
import { profileStore } from '../../../../utils/Zustand/ProfileStore/ProfileStore';

// Types
import { formPropsType, genderSelectionType, profileDetailsType } from './UpdateFormTypes';
import { profileState } from '../../../../utils/Zustand/ProfileStore/ProfileStoreTypes';

const UpdateForm: FC<formPropsType> = (props) => {
    const { id, formData } = props || {};

    // Global State 
    const { profileService } = profileStore((state: profileState) => state, shallow)

    const updateProfileDataAction = (values: profileDetailsType): Promise<void> | void => {
        const updateServiceConfig: serviceTypes = { action: "UPDATE_PROFILE_DATA", params: values, id }
        return profileService(updateServiceConfig)
    }

    // Gender Selection Option
    const genderOptionSelection: genderSelectionType[] = [{ value: "male", label: "Male" }, { value: "female", label: "Female" }]

    // Form Values Validation Configuration
    const UserDetailsSchema = Yup.object().shape({
        email: Yup.string().email().required('Field Required'),
        firstName: Yup.string().required('Field Required'),
        lastName: Yup.string().required('Field Required'),
        title: Yup.string().required('Field Required'),
        gender: Yup.string().required('Field Required'),
        dateOfBirth: Yup.string().required('Field Required'),
        phone: Yup.string().required('Field Required'),
        picture: Yup.string().url().required('Field Required'),
        location: Yup.object().shape({
            street: Yup.string().required('Field Required'),
            city: Yup.string().required('Field Required'),
            state: Yup.string().required('Field Required'),
            country: Yup.string().required('Field Required'),
            timezone: Yup.string().required('Field Required'),
        })
    })

    // Form Header Display
    const formHeader = () => {
        const { picture } = formData || {};

        return id ? (
            <div className='flex  items-center justify-center py-3'>
                <img
                    className='userListImage'
                    src={picture}
                    alt="User-Profile"
                />
            </div>
        ) : null
    }

    // Update Form 
    const formBody = () => {
        return (
            <Formik
                enableReinitialize
                initialValues={formData || {}}
                validationSchema={UserDetailsSchema}
                onSubmit={updateProfileDataAction}
            >
                <Form>
                    <div className='grid grid-cols-4 gap-3'>
                        <InputField name={"email"} type={"email"} label={"Email Address :"} disabled={true} />
                        <InputField name={"title"} type={"text"} label={"Name Title :"} />
                        <InputField name={"firstName"} type={"text"} label={"First Name :"} />
                        <InputField name={"lastName"} type={"text"} label={"Last Name :"} />
                        <InputField name={"gender"} type={"select"} label={"Gender :"} option={genderOptionSelection} />
                        <InputField name={"dateOfBirth"} type={"date"} label={"Date Of Birth :"} />
                        <InputField name={"phone"} type={"text"} label={"Phone :"} />
                        <InputField name={"picture"} type={"text"} label={"Image URL :"} />
                        <InputField name={"location.city"} type={"text"} label={"City :"} />
                        <InputField name={"location.street"} type={"text"} label={"Street :"} />
                        <InputField name={"location.state"} type={"text"} label={"State :"} />
                        <InputField name={"location.country"} type={"text"} label={"Country :"} />
                        <InputField name={"location.timezone"} type={"text"} label={"Timezone :"} />
                    </div>
                    <div className='py-2'>
                        <Button buttonTitle={"Update Profile"} buttonStyle={"primary"} />
                    </div>
                </Form>
            </Formik>
        )
    }

    return (
        <Fragment>
            {formHeader()}
            {formBody()}
        </Fragment>
    )
}

export default UpdateForm