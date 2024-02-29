import api from '../config/Api';
import { User } from '../types/models/User.model';

const UserService = {
  getUser: async (userID: string): Promise<User> => {
    const response = await api.get<User>(`/user/${userID}`);
    return response.data;
  },

  updateUser: (user: User) => {
    return api.put(`/user/${user.id}`, user);
  },

  addUser: (user: User) => {
    return api.post('/user/registerUser', user).then((res) => {
      return res.data;
    });
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/user');
    return response.data;
  },

  deleteUser: (id: string) => {
    return api.delete(`/user/${id}`);
  },
};

export default UserService;
