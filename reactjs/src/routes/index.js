import { WithoutLayout } from "../layouts";

import Home from "../pages/Home/";
import Login from "../pages/Login/Login";
import Register from '../pages/Register/index';
import UserProfile from "../pages/Profile/Userprofile";
import Admin from "../Admin";
import AdminPage from "../Admin";
import ChatRoomList from "../Admin/Tables/chatRoomList";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/Login", component: Login, layout: WithoutLayout },
  { path: "/Register", component: Register, layout: WithoutLayout },
  { path: "/user", component: UserProfile },
  { path: "/admin", component: AdminPage, layout: WithoutLayout },
  {
    path: "/admin/chatroomlist", component: ChatRoomList, layout: WithoutLayout 
  },
];

export { publicRoutes };
