import { WithoutLayout } from "../layouts";
import { MenuAdmin } from "../Admin/Layouts/Sidebar";
import Home from "../pages/Home/";
import Login from "../pages/Login/Login";
import Register from '../pages/Register/index';
import UserProfile from "../pages/Profile/Userprofile";
import ChatRoomList from "../Admin/Tables/chatRoomList";
import StaffList from "../Admin/Tables/staffList";
import StudentList from "../Admin/Tables/StudentList";
import { LayoutAdmin } from "../Admin";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/Login", component: Login, layout: WithoutLayout },
  { path: "/Register", component: Register, layout: WithoutLayout },
  { path: "/user", component: UserProfile },
  { path: "/admin", component: ChatRoomList, layout: LayoutAdmin },
  {
    path: "/admin/chatroomlist", component: ChatRoomList, layout: LayoutAdmin
  },
  {
    path: "/admin/stafflist", component: StaffList, layout: LayoutAdmin
  },
  ,
  {
    path: "/admin/studentlist", component: StudentList, layout:LayoutAdmin
  }
];

export { publicRoutes };
