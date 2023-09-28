/* eslint-disable react-hooks/rules-of-hooks */
import React, { FC, useState } from 'react';

// components
import { API } from '../../../service/API/Server/Server';

// Types
import { interceptorProps, loaderProps } from './LoaderTypes';

// Loader UI Display
const LoaderUI: FC<loaderProps> = (props) => {
    const { show } = props || {};

    return show ? (
        <div id="loader" className="z-10 fixed inset-0 bg-gray-100 min-h-screen flex flex-row gap-2 justify-center items-center">
            <div className="animate-bounce text-xl font-bold">●</div>
            <div className="animate-bounce text-xl font-bold">●</div>
            <div className="animate-bounce text-xl font-bold">●</div>
        </div>
    ) : null
}

// HOC Function Loader
const Loader: interceptorProps = WrappedComponent =>
    (props) => {

        // Hide Loader Show Default
        const [showLoader, setShowLoader] = useState<boolean>(true);
        
        // HTTP Listener 
        API.interceptors.response.use(
            (response) => {
                // Hide Loader
                setShowLoader(false);
                return response;
            },
            (error) => {
                // Hide Loader
                setShowLoader(false);
                return Promise.reject(error);
            }
        )

        return (
            <div role="loader" id="loader">
                <LoaderUI show={showLoader} />
                <WrappedComponent {...props} showPage={showLoader} />
            </div>
        )
    }

export default Loader