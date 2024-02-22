import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';
import UserTable from '../components/pages/UserPage/UserTable';
import UserPage from '../components/pages/UserPage/UserPage';
import authorities from '../config/Authorities';
import HomePage from "../components/pages/HomePage";
import ListPage from "../components/pages/ListPage/ListPage";
import AdminPage from "../components/pages/AdminPage/AdminPage";

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  //const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>

      <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/lists'} element={<ListPage/>} />
        <Route path={'/admin'} element={<AdminPage/>} />





        <Route
        path={'/users'}
        element={<PrivateRoute requiredAuths={[]} element={<UserTable />} />}
      />
      <Route
        path='/useredit'
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_DEACTIVATE, authorities.USER_CREATE]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />
      <Route
        path='/useredit/:userId'
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_READ]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />

      <Route path='*' element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;
