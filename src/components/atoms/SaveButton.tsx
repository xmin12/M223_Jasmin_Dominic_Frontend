import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface SaveButtonProps extends ButtonProps {
    // Define any additional props specific to SaveButton component
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick, children, ...otherProps }) => {
    return (
        <Button
            onClick={onClick}
            {...otherProps}>
            {children}
        </Button>
    );
};

export default SaveButton;
