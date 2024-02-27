import React from 'react';
import { useFormik } from 'formik';
import { User } from '../../../types/models/User.model';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

interface UserProps {
  user: User;
  submitActionHandler: (values: User) => void;
}

const UserForm = ({ user, submitActionHandler }: UserProps) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      roles: user.roles || [],
    },
    validationSchema: object({
      firstName: string().required().min(2).max(50),
      lastName: string().required().min(2).max(50),
      email: string().required().email(),
    }),
    onSubmit: async (values: User) => {
      try {
        // Call the submitActionHandler function with the updated user data
        await submitActionHandler(values);
        // Optionally, you can navigate to another page after successful submission
        navigate('/admin');
      } catch (error) {
        console.error('Error submitting user data:', error);
        // Optionally, you can handle errors here, such as displaying an error message to the user
      }
    },
    enableReinitialize: true,
  });

  return (
      <>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ paddingTop: '15px' }}>
            <TextField
                id='firstName'
                label='Firstname'
                variant='outlined'
                sx={{ paddingRight: '10px' }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                value={formik.values.firstName}
            />
            {formik.errors.firstName && formik.touched.firstName ? (
                <div style={{ color: 'red' }}>{formik.errors.firstName}</div>
            ) : null}
            <TextField
                id='lastName'
                label='Lastname'
                variant='outlined'
                sx={{ paddingRight: '10px' }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                value={formik.values.lastName}
            />
            {formik.errors.lastName && formik.touched.lastName ? (
                <div style={{ color: 'red' }}>{formik.errors.lastName}</div>
            ) : null}
            <TextField
                id='email'
                label='E-Mail'
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.email && formik.errors.email)}
                value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
            ) : null}
          </Box>
          <div>
            <Button
                variant='contained'
                color='success'
                type='submit'
            >
              Save
            </Button>
            <Button
                variant='contained'
                color='error'
                onClick={() => {
                  navigate('/admin');
                }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </>
  );
};

export default UserForm;
