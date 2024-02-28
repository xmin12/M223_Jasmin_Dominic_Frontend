import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import UserService from '../../../Services/UserService';
import { User } from '../../../types/models/User.model';
import UserForm from "../../molecules/UserForm/UserForm";

interface UserTableProps {
  onEdit: (user: User) => void; // Define the onEdit prop
}

const UserTable: React.FC<UserTableProps> = ({ onEdit }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

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
            console.error('Error updating user:', error);
            // Handle error as needed
          });
    }
  };


  return (
      <>
        {users.map((user) => (
            <div key={user.id}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  {user.firstName} {user.lastName} {user.email}
                  <CardActions>
                    <Button
                        size='small'
                        color='primary'
                        variant='contained'
                        onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
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
        <Dialog open={Boolean(editingUser)} onClose={handleCloseForm}>
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
