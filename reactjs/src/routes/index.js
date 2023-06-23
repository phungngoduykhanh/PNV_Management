import { WithoutLayout } from "../layouts";

import Home from "../pages/Home/";
import Login from "../pages/Login/Login";
import Register from '../pages/Register/index';
import MyCalendar from "../pages/Calendar/Calendar";
import Navigation from "../pages/Calendar/Calendar";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/Login", component: Login, layout: WithoutLayout },
  { path: "/Register", component: Register, layout: WithoutLayout },
  { path: "/Calendar", component: MyCalendar, layout: WithoutLayout },
 

];

export { publicRoutes };
