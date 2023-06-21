import { WithoutLayout } from "../layouts";

import Home from "../pages/Home/";
import Login from "../pages/Login/Login";
import Register from '../pages/Register/index';
import ShowStudent from "../pages/DetailClass/DetailClass";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/Login", component: Login, layout: WithoutLayout },
  { path: "/Register", component: Register, layout: WithoutLayout },
  { path: "/detailclass/:class_id", component: ShowStudent}
];

export { publicRoutes };
