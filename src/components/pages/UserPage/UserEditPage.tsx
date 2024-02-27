import React, {useContext, useEffect} from 'react';
import {Typography} from '@mui/material';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import Navbar from "../../../Router/Navbar";
import UserPage from "./UserPage";

// Define the AdminPage component
const UserEditPage = () => {
    const {user} = useContext(ActiveUserContext);
    // State to manage the dialog visibility


    // Render the AdminPage component
    return (
        <>
            <Navbar/>
            <div>
                <Typography variant="h3">Edit User</Typography>
                {user && (
                    <Typography variant="subtitle1">
                        Logged in as: {user.firstName} {user.lastName} ({user.email})
                    </Typography>
                )}
          <UserPage/>
            </div>
        </>
    );
};

export default UserEditPage;
