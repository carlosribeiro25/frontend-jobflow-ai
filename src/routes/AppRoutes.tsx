import Dashboard from "@/pages/Dashboard";
import { ForgotPassword } from "@/pages/Forgot-password";
import HomePage from "@/pages/Home";
import Login from "@/pages/Login";
import { ResetPassword } from "@/pages/Reset-password";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoutes";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={
                <PrivateRoute>
                    <HomePage />
                </PrivateRoute>
            } />

            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>} />


            <Route path='/esqucer-senha' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />

        </Routes>
    )
}