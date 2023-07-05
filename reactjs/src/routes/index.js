import { WithoutLayout } from "../layouts";

import Home from "../pages/Home/";
import Login from "../pages/Login/Login";
import Register from '../pages/Register/index';
import UserProfile from "../pages/Profile/Userprofile";
import ProfilePage from "../pages/Profile/Userprofile";


const publicRoutes = [
  { path: "/", component: Home },
  { path: "/Login", component: Login, layout: WithoutLayout },
  { path: "/Register", component: Register, layout: WithoutLayout },
  { path: "/user", component: UserProfile}, 
  { path: "/users", component: ProfilePage}
];

export { publicRoutes };
