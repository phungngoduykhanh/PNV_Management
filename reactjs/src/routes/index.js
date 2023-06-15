import { WithoutLayout } from "../layouts";

import Home from "../pages/Home/";
import Login from "../pages/Login/Login";


const publicRoutes = [
  { path: "/", component: Home },
  { path: "/Login", component: Login, layout: WithoutLayout },
];

export { publicRoutes };
