import React, {useContext, useEffect, useState} from 'react';
import {Typography} from '@mui/material';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';

import Navbar from "../../../Router/Navbar";
import UserTable from "../UserPage/UserTable";


// Define the AdminPage component
const AdminPage = () => {
    // Use the useContext hook to access the ActiveUserContext
    const {user, loadActiveUser} = useContext(ActiveUserContext);
    // State to manage the dialog visibility

    useEffect(() => {
        loadActiveUser();
    }, []);

    // Render the AdminPage component
    return (
        <>
            <Navbar/>
            <div>
                <Typography variant="h3">Admin Page</Typography>
                {user && (
                    <Typography variant="subtitle1">
                        Logged in as: {user.firstName} {user.lastName} ({user.email})
                    </Typography>
                )}
                <UserTable onEdit={(user) => console.log(user)} />
            </div>
        </>
    );
};

export default AdminPage;
