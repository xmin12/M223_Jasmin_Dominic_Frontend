import React, {useContext, useEffect, useState} from 'react';
import {Button, Typography} from '@mui/material';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import Navbar from "../../../Router/Navbar";
import UserTable from "../UserPage/UserTable";
import UserEditPage from "../UserPage/UserEditPage";
import UserForm from "../../molecules/UserForm/UserForm";
import {User} from "../../../types/models/User.model";



// Define the AdminPage component
const AdminPage = () => {
    const { user } = useContext(ActiveUserContext);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleEditUser = (user: User) => {
        setEditingUser(user);
    };

    const handleCloseForm = () => {
        setEditingUser(null);
    };

    const handleSubmitForm = (updatedUser: User) => {
        // Handle form submission logic here
        console.log("Updated user:", updatedUser);
        handleCloseForm(); // Close the form after submission
    };
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
