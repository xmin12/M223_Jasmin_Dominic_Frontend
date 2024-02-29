import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {User} from '../../../types/models/User.model';
import UserService from '../../../Services/UserService';
import UserForm from '../../molecules/UserForm/UserForm';

const UserPage = () => {
    const navigate = useNavigate();
    const {userId} = useParams();
    const [user, setUser] = useState<User>({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        roles: [],
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (userId) {
                    const userData = await UserService.getUser(userId);
                    setUser(userData);
                }
            } catch (error) {

                // You might want to handle errors here, like showing a message to the user
            }
        };

        fetchUser();
    }, [userId]);

    const submitActionHandler = (values: User) => {
        if (userId) {
            UserService.updateUser(values).then(() => {
                navigate('../users');
            });
        } else {
            UserService.addUser(values).then(() => {
                navigate('/users');
            });
        }
    };

    return <UserForm user={user} submitActionHandler={submitActionHandler}/>;

};

export default UserPage;