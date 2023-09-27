import React, { FC, ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';

// Components
import Loader from '../HOC/Loader/Loader';
import Button from '../Button/Button';

// Zutand Component
import { userStore } from '../../utils/Zustand/UserStore/UserStore';

// Types
import { userDataType } from './UserListTypes';

const UserList: FC = () => {
    const navigate = useNavigate();

    // Local State
    const { userData, getUserDataAction } = userStore((state) => state, shallow)

    // Pre Fetch Request
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
                            {title ?? null}
                            {firstName ?? null}
                            {lastName ?? null}
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

        return userData ? (
            <div className='grid grid-cols-3 gap-2'>{(userData ?? []).map(displayUserDetails)}</div>
        ) : null
    }

    // User List Component Title Label
    const userListTitle = () => {
        return (
            <div className='text-xl font-semibold'>User List</div>
        )
    }

    return (
        <div>
            {userListTitle()}
            {UserListData()}
        </div>
    )
}

export default Loader(UserList)