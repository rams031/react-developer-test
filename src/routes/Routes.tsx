import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Components
import UserList from "../component/UserList/UserList";
import Profile from "../component/Profile/Profile";

// Types
import { routeType } from './RoutesTypes';
 

// Navigation Routes Configuration
const Routes: routeType[] = [
    {
        path: "/",
        element: <UserList />,
    },
    {
        path: "/profile/:profileId?",
        element: <Profile />,

    },
    {
        path: "*",
        element: <div>Page Not Found</div>,
    },
]

export default createBrowserRouter(Routes);