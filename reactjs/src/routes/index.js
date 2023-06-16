import Home from "../pages/Home/";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import UserProfile from "../pages/Profile/Userprofile";
// import hoso from "../pages/Profile/hoso"


const publicRoutes = [
  { path: "/", component: Home },
  { path: "/pass", component: ForgotPassword }, 
  { path: "/user", component: UserProfile},
  // { path: "/prof", component: hoso },
  
];

export { publicRoutes };
