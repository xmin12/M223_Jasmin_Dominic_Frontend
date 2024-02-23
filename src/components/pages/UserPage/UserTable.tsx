import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, Button } from '@mui/material';
import UserService from '../../../Services/UserService';
import { User } from '../../../types/models/User.model';


interface UserTableProps {
  onEdit: (user: User) => void; // Define the onEdit prop
}

const UserTable: React.FC<UserTableProps> = ({ onEdit }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    UserService.getAllUsers().then((data) => {
      setUsers(data.data);
    });
  }, []);

  const handleDelete = (id: string) => {
    UserService.deleteUser(id).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
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
                        onClick={() => (user)}
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
      </>
  );
};

export default UserTable;
