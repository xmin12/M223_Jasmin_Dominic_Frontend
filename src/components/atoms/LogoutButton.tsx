import React, {useContext} from 'react';
import {Button} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ActiveUserContext from "../../Contexts/ActiveUserContext";


const LogoutButton = () => {
    const {logout} = useContext(ActiveUserContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <Button data-cy="Log-out-button" color="inherit" onClick={handleLogout} startIcon={<LogoutIcon/>}></Button>
    );
}

export default LogoutButton;
