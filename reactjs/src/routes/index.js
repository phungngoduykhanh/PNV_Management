import { WithoutLayout } from "../layouts";

import Home from "../pages/Home/";
import Login from "../pages/Login/Login";
import Register from '../pages/Register/index';

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/Login", component: Login, layout: WithoutLayout },
  { path: "/Register", component: Register, layout: WithoutLayout }

];

export { publicRoutes };
