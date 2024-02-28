import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import logo from '../logo1.png';
import { useNavigate } from 'react-router-dom';
import LogoutButton from "../components/atoms/LogoutButton";


export default function Navbar() {
    const navigate = useNavigate();

    const handleButtonClick = (path: string) => {
        console.log('Navigating to:', path);
        navigate(path); // Navigate to the specified path
    };



    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <img src={logo} alt="logo" style={{ width: 50, marginRight: 10 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Noser Young
                    </Typography>
                    <Button data-cy="home-button" color="inherit" onClick={() => handleButtonClick('/')}>Home</Button>
                    <Button data-cy="lists-button" color="inherit" onClick={() => handleButtonClick('/lists')}>Lists</Button>
                    <Button data-cy="admin-button" color="inherit" onClick={() => handleButtonClick('/admin')}>Admin</Button>
                    <LogoutButton/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
