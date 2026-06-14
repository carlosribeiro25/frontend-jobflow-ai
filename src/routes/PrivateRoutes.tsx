import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { type ReactNode } from "react";

interface PrivateRouteProps{
    children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    const token = Cookies.get('token')
    return token ? children: <Navigate to='/login'/>
}