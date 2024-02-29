import React, {useEffect, useState} from 'react';
import {Card, CardActions, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import UserService from '../../../Services/UserService';
import {User} from '../../../types/models/User.model';
import UserForm from "../../molecules/UserForm/UserForm";


interface UserTableProps {
    onEdit: (user: User) => void; // Define the onEdit prop
    submitActionHandler: (newUser: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({onEdit}) => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [openDialog, setOpenDialog] = useState(false); // State to control the dialog

    useEffect(() => {
        UserService.getAllUsers().then((data) => {
            setUsers(data);
        });
    }, []);

    const handleDelete = (id: string) => {
        UserService.deleteUser(id).then(() => {
            setUsers(users.filter((user) => user.id !== id));
        });
    };

    const handleAdd = () => {
        setOpenDialog(true); // Open the dialog when Add button is clicked
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
    };

    const handleCloseForm = () => {
        setEditingUser(null);
    };

    const handleSave = (updatedUser: User) => {
        const updatedUsers = [...users];
        const index = updatedUsers.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) {
            updatedUsers[index] = updatedUser;
            // Call the API to update the user
            UserService.updateUser(updatedUser)
                .then(() => {
                    setUsers(updatedUsers);
                    onEdit(updatedUser);
                    handleCloseForm();
                })
                .catch((error) => {

                    // Handle error as needed
                });
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog
    };

    const handleCreateUser = (newUser: User) => {
        // Check if a user with the same email already exists
        const existingUser = users.find(user => user.email === newUser.email);
        if (existingUser) {
            alert('A user with the same email already exists.');
            return;
        }

        UserService.addUser(newUser)
            .then((createdUser) => {
                setUsers([...users, createdUser]); // Add the new user to the list
                handleCloseDialog();
            })
            .catch((error) => {
                // Handle error as needed
            });
    };
    return (
        <>
            <Button
                data-cy="Admin-add-button"
                size='small'
                color='success'
                variant='contained'
                onClick={handleAdd}
            >
                Add
            </Button>
            {users.map((user) => (
                <div key={user.id}>
                    <Card sx={{minWidth: 275}}>
                        <CardContent>
                            <div data-cy="user-firstname-field">{user.firstName}</div>
                            <div data-cy="user-lastname-field">{user.lastName}</div>
                            <div data-cy="user-email-field">{user.email}</div>
                            <CardActions>
                                <Button
                                    data-cy="Admin-edit-button"
                                    size='small'
                                    color='primary'
                                    variant='contained'
                                    onClick={() => handleEdit(user)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    data-cy="Admin-delete-button"
                                    size='small'
                                    color='error'
                                    variant='contained'
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </div>
            ))}
            <Dialog open={openDialog} onClose={handleCloseDialog}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '200px',
                        width: '400px',
                        maxHeight: '500px',
                        overflowY: 'auto' // Example minimum height
                    }}>
                <DialogTitle>Create New User</DialogTitle>
                <DialogContent>
                    <UserForm user={{id: '', firstName: '', lastName: '', email: '', roles: []}}
                              submitActionHandler={handleCreateUser}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="error">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={Boolean(editingUser)} onClose={handleCloseForm} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                width: '400px',
                maxHeight: '500px',
                overflowY: 'auto' // Example minimum height
            }}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    {editingUser && (
                        <UserForm
                            user={editingUser}
                            submitActionHandler={handleSave}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        data-cy="Userform-cancel-button"
                        onClick={handleCloseForm}
                        color="error">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UserTable;
