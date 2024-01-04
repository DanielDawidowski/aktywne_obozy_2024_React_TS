import { lazy } from "react";

const AuthTabs = lazy(() => import("./auth-tabs/AuthTabs"));
const Login = lazy(() => import("./login/Login"));
const Register = lazy(() => import("./register/Register"));

export { AuthTabs, Login, Register };
