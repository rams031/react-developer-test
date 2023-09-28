import React, { FC, ReactElement, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';

// Components
import Loader from '../HOC/Loader/Loader';
import Button from '../Button/Button';
import CreateForm from '../Profile/Form/CreateForm/CreateForm';

// Zutand Component
import { userStore } from '../../utils/Zustand/UserStore/UserStore';
import { profileStore } from '../../utils/Zustand/ProfileStore/ProfileStore';

// Types
import { userDataType } from './UserListTypes';

const UserList: FC = () => {
    const navigate = useNavigate();

    // Global State
    const { userData, getUserDataAction } = userStore((state) => state, shallow);
    const { profileService } = profileStore((state) => state, shallow);

    // Local State
    const [createView, setCreateView] = useState<boolean>(false);

    // Pre Fetch Global User Data
    useEffect(() => {
        getUserDataAction()
        // eslint-disable-next-line
    }, [])

    // View User Details Button Props 
    const viewUserButtonPropsContainer: buttonProps = {
        buttonStyle: "dark",
        buttonTitle: "View User",
    }

    // Display User Details List
    const UserListData = (): JSX.Element[] | undefined | null | ReactElement<any, any> => {
        // User List Cards Display (Map)
        const displayUserDetails = (item: userDataType, index: number) => {
            const { firstName, lastName, title, picture, id } = item ?? {};
            return (
                <div key={index} className='userListCard'>
                    <div>
                        <img
                            className='userListImage'
                            src={picture}
                            alt="User-Profile"
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='userListName'>
                            {title ?? null}{" "}
                            {firstName ?? null}{" "}
                            {lastName ?? null}{" "}
                        </div>
                        <div className='flex flex-row gap-2'>
                            <Button
                                {...viewUserButtonPropsContainer}
                                buttonAction={() => navigate("/profile/" + id)}
                            />
                        </div>
                    </div>
                </div>
            )
        }

        return userData && !createView ? (
            <div className='grid grid-cols-3 gap-2'>{(userData ?? []).map(displayUserDetails)}</div>
        ) : null
    }

    // Create Profile Form Display
    const createProfileForm = () => {
        return createView ? (
            <div className='card'>
                <CreateForm setCreateView={setCreateView} />
            </div>
        ) : null
    }

    // Navigate Create User Create Form
    const createUserButtonDisplay = () => {
        // Button Create User Config
        const CreateUserButtonPropsContainer: buttonProps = {
            buttonStyle: "primary",
            buttonTitle: "Create User",
            buttonAction: () => setCreateView(!createView)
        }

        return !createView ? (
            <div className='flex flex-row justify-end items-center'>
                <Button {...CreateUserButtonPropsContainer} />
            </div>
        ) : null
    }

    return (
        <div>
            {createProfileForm()}
            {createUserButtonDisplay()}
            {UserListData()}
        </div>
    )
}

export default Loader(UserList)