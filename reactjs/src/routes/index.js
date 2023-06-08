import Home from "../pages/Home/";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";


const publicRoutes = [
  { path: "/", component: Home },
  { path: "/pass", component: ForgotPassword }, 
];

export { publicRoutes };
