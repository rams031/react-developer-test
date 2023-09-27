import { FC, useEffect } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import shallow from 'zustand/shallow';

// Components
import Loader from '../HOC/Loader/Loader'
import Button from '../Button/Button';
import UpdateForm from './Form/UpdateForm/UpdateForm';

// Zustand Component
import { profileStore } from '../../utils/Zustand/ProfileStore/ProfileStore';

// Types 
import { paramsType } from './ProfileTypes';

const Profile: FC = () => {
    const navigate: NavigateFunction = useNavigate();
    const { profileId } = useParams() as Readonly<paramsType>;

    // Global State 
    const { profileData, profileService } = profileStore((state) => state, shallow);

    // Pre Fetch Global Profile Data
    useEffect(() => {
        if (profileId) { profileService({ action: "FETCH_PROFILE_DATA", id: profileId }) }
        // eslint-disable-next-line
    }, [])

    // Update Profile Form Display (if params exist)
    const updateProfileForm = () => {
        return profileId && profileData !== null ? (
            <div className='card'>
                <UpdateForm id={profileId} formData={profileData} />
            </div>
        ) : null
    }

    // Error Result Display 
    const errorResultDisplay = () => {
        return profileId && !profileData ? (
            <div className="flex flex-col justify-center items-center">
                <div className='text-md font-semibold'>No User Details Found  </div>
                <div className='text-sm font-medium'>From ID: ({profileId})</div>
            </div>
        ) : null
    }

    // Back Navigation Option Display 
    const backNavigationOption = () => {
        return (
            <div className='flex justify-between items-center py-2'>
                <Button
                    buttonStyle={"dark"}
                    buttonTitle={"Back"}
                    buttonAction={() => navigate(-1)}
                />
                <Button
                    buttonStyle={"danger"}
                    buttonTitle={"Delete Profile"}
                    buttonAction={() => profileService({ action: "DELETE_PROFILE_DATA", id: profileId, afterAction: navigate("/")  })}
                />
            </div>
        )
    }

    return (
        <div className='min-h-screen flex flex-col'>
            {backNavigationOption()}
            {errorResultDisplay()}
            {updateProfileForm()}
        </div>
    )
}

export default Loader(Profile)