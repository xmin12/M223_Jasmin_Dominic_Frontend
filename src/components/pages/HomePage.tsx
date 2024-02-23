import React from 'react';
import { Box } from '@mui/material';
import logo from '../../logo1.png';
import Navbar from "../../Router/Navbar";
export default function HomePage() {


    return (
        <Box>
         <Navbar/>
            <Box
                style={{padding: '180px'}}
                display='flex'
                alignItems='center'
                justifyContent='center'
                flexDirection={'column'}
            >
                <h1>Welcome to the group 6 Custom List Project</h1>
                <img
                    src={logo}
                    style={{filter: 'invert(100%)', padding: '50px'}}
                    className='App-logo'
                    alt='logo'
                />
            </Box>
        </Box>
    );
}
