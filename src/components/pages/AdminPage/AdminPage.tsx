import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import Navbar from "../../../Router/Navbar";
import UserTable from "../UserPage/UserTable";
import { User } from "../../../types/models/User.model";
import logo from "../../../logo1.png";


// Define the AdminPage component
const AdminPage = () => {
    const { user, checkRole } = useContext(ActiveUserContext);

    // Check if the user is an admin
    const isAdmin = checkRole('ADMIN');


    // Render the AdminPage component only if the user is an admin
    return (
        <>
            {isAdmin ? (
                <>
                    <Navbar/>
                    <div style={{ position: 'relative' }}>
                        <Typography variant="h3">Admin Page</Typography>
                        {user && (
                            <Typography variant="subtitle1">
                                Logged in as: {user.firstName} {user.lastName} ({user.email})
                            </Typography>
                        )}
                        <div style={{ margin: '0 auto', width: '80%', padding: '40px' }}>
                            <UserTable onEdit={(user: User) => console.log(user)} />
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    <Navbar/>
                    <Box
                        style={{padding: '120px'}}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        flexDirection={'column'}
                    >
                        <Typography variant="h3">Admin Page</Typography>
                        {user && (
                            <Typography variant="subtitle1">
                                Logged in as: {user.firstName} {user.lastName} ({user.email})
                            </Typography>
                        )}
                        <img
                            src={logo}
                            style={{filter: 'invert(100%)', padding: '50px'}}
                            className='App-logo'
                            alt='logo'
                        />
                    </Box>
                </div>
            )}
        </>
    );
};

export default AdminPage;
