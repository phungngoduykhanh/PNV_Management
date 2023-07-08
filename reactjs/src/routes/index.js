import { WithoutLayout } from "../layouts";

import Home from "../pages/Home/";
import Chat from "../pages/Chat/";
import ChatRoom from "../pages/ChatRoom/";
import Login from "../pages/Login/Login";
import Register from '../pages/Register/index';
import UserProfile from "../pages/Profile/Userprofile";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/chat", component: Chat },
  { path: "/chatroom/:id", component: ChatRoom },

  { path: "/Login", component: Login, layout: WithoutLayout },
  { path: "/Register", component: Register, layout: WithoutLayout },
  { path: "/user", component: UserProfile}
];

export { publicRoutes };
