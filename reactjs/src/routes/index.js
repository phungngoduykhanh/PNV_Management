import { WithoutLayout } from "../layouts";
import Home from "../pages/Home/";
import Login from "../pages/Login/Login";
import Test from "../pages/Test";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/Login", component: Login, layout: WithoutLayout },
];

export { publicRoutes };
